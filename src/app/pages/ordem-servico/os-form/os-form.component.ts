import { EnderecoModel } from './../../../models/cliente-models/endereco.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ClienteModel } from 'src/app/models/cliente-models/cliente.model';
import { VeiculoModel } from 'src/app/models/cliente-models/veiculo.model';
import { ItemModel, OrdemServicoModel } from 'src/app/models/ordem-servico.model';
import { ServicoModel } from 'src/app/models/servico.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ItemService } from 'src/app/services/item.service';
import { ServicosService } from 'src/app/services/servicos.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { startWith, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OsService } from 'src/app/services/os.service';
import { DatePipe } from '@angular/common'
import { TecnicoModel } from 'src/app/models/tecnicos.model';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { OrcamentoModel } from 'src/app/models/orcamento.model';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { OnChanges } from '@angular/core';
import { MatTableDataSource, throwMatDialogContentAlreadyAttachedError } from '@angular/material';

@Component({
  selector: 'app-os-form',
  templateUrl: './os-form.component.html',
  styleUrls: ['../../../pages/cliente/cliente-form/cliente-form.component.scss', '../../../app.component.scss']
})
export class OsFormComponent implements OnInit{

  STATUS = {
    aguardando: "Aguardando Aprovação",
    executando: "Executando",
    finalizado: "Finalizado"
  }

  novaAcao: string = '';
  ordemServico: OrdemServicoModel = new OrdemServicoModel();
  listaClientes: ClienteModel[] = [];
  listaVeiculos: Array<VeiculoModel>
  listaServicos: Array<ServicoModel>
  listaTecnicos: Array<TecnicoModel>
  listaOrcamento: Array<OrcamentoModel>
  listaItem: Array<ItemModel>
  isVeiculo: boolean = false;
  disabledVeiculo: boolean = true
  dataSourceCarrinho = new MatTableDataSource<any>();
  dataSourceCarrinhoServicos = new MatTableDataSource<any>();

  clienteNome = new FormControl();
  cliente = new FormControl();
  veiculo = new FormControl();
  tecnico = new FormControl();
  orcamento = new FormControl(null, [Validators.required]);
  objOrcamento: OrcamentoModel = new OrcamentoModel();
  objetoCliente: ClienteModel;
  veiculos: Array<VeiculoModel>
  tecnicos: Array<TecnicoModel>
  orcamentos: Array<OrcamentoModel>
  id: number = null;
  formulario: FormGroup;
  acaoStatus: string = '';
  desabilitaAcaoOs: boolean = false;
  valorTotal: number = 0;

  isOrcamentoVisible: boolean = false;

  clienteGroup: Observable<ClienteModel[]>;
  veiculoGroup: Observable<VeiculoModel[]>;
  tecnicoGroup: Observable<TecnicoModel[]>;
  orcamentoGroup: Observable<OrcamentoModel[]>;
  orcamentoSave;

  formularioAcao: FormGroup;
  formularioOrcamento: FormGroup;

  constructor(private clienteService: ClienteService,
    private osService: OsService,
    private veiculoService: VeiculoService,
    private servicoService: ServicosService,
    private orcamentoService: OrcamentoService,
    private toastNotification: ToastrService,
    private tecnicoService: TecnicoService,
    private itemService: ItemService,
    private router: Router,
    private routeActivate: ActivatedRoute,
    private fb: FormBuilder,
    public datepipe: DatePipe
  ) { }


  atualizarTecnico() {
    this.carregarTecnicos();
  }


  atualizarOrcamento(){
    let orcamentoId = this.orcamento.value; 
    if(orcamentoId) {
      var id = +orcamentoId.replace('OC00','');
      let orc = this.orcamentos.find( o => o.id === id);
      this.objOrcamento = this.orcamentos.find( o => o.id === id);
      this.orcamentoSave = this.orcamento;
      this.dataSourceCarrinho.data = orc.produtos;
      this.dataSourceCarrinhoServicos.data = orc.servicos;
      this.valorTotal = orc.valorTotal;
      this.formularioOrcamento.controls['problemas'].setValue(orc.problemas !== null && orc.problemas !== '' ? orc.problemas : ''); 
    }
    this.carregarOrcamento();
  };

  ngOnInit() {
    this.buildForm();
    this.carregarClientes();
    this.carregarVeiculos();
    this.carregarServicos();
    this.carregarTecnicos();
    this.carregarOrcamento();
    this.routeActivate.params.subscribe(
      (params: any) => {
        const id = params.id;
        if (id) {
          this.id = id;
          const os$ = this.osService.getById(id);
          os$.subscribe(os => {
            this.ordemServico = os;
            this.updateForm(os);
          });
        }
      }
    );
  }

  private _filter(value: string): ClienteModel[] {
    this.isVeiculo = false
    this.disabledVeiculo = true
    if (value !== null) {
      const filterValue = value.toLowerCase();
      this.objetoCliente = this.listaClientes.find(options => options.nome.toLowerCase().indexOf(filterValue) === 0);
      if(this.cliente.value){
        this.isOrcamentoVisible = true;
      }
      if( this.cliente.value != null && this.objetoCliente && this.objetoCliente.veiculos.length > 0){
        this.isVeiculo = true;
        this.veiculos = this.objetoCliente.veiculos;
        this.formulario.get('cliente').markAsUntouched();
        this.filteredVeiculo();
      }  else if(this.objetoCliente && this.cliente.value != null) {
        this.isVeiculo = false
        this.disabledVeiculo = false;
      } else {
        this.isVeiculo = false
      }
      return this.listaClientes.filter(options => options.nome.toLowerCase().indexOf(filterValue) === 0);
    }
    
  }

  filteredVeiculo() {
    this.veiculoGroup = this.veiculo.valueChanges.pipe(
      startWith(''),
      map(value => this._filterVeic(value))
    );
  }

  _filterVeic(value: string): VeiculoModel[]{
    const filterValue = value.toLowerCase();

    return this.veiculos.filter(option => option.modelo.toLowerCase().indexOf(filterValue) === 0);
  }


  
  filteredTecnico() {
    this.formularioAcao.get('tecnicos').markAsUntouched();
    this.tecnicoGroup = this.tecnico.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTec(value))
    );
  }

  _filterTec(value: string): TecnicoModel[]{
    this.formularioAcao.get('tecnicos').markAsUntouched();
    const filterValue = value.toLowerCase();
    return this.tecnicos.filter(option => option.nome.toLowerCase().indexOf(filterValue) === 0);
  }


  filteredOrcamento() {
    this.formularioAcao.get('orcamentos').markAsUntouched();
    this.orcamentoGroup = this.orcamento.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOrc(value))
    );
  }

  _filterOrc(value: string): OrcamentoModel[]{
    const filterValue = value === "" || value === null || value === undefined ? "a" : value.toLowerCase();
    return this.orcamentos.filter(option => option.cliente.nome === this.cliente.value);
  }



  clearClientsAndVinc() {
    this.cliente.setValue('');
    this.isVeiculo = false;
    this.disabledVeiculo = true;
    this.veiculo.reset();
    this.orcamento.reset();
    this.isOrcamentoVisible = false;
    this.formularioOrcamento.reset();
    this.tecnico.reset();
    this.formularioAcao.reset();
    this.dataSourceCarrinho.data = [];
    this.dataSourceCarrinhoServicos.data = []
    this.valorTotal = 0;
    this.carregarOrcamento();
  }

  clearAll() {
    this.isVeiculo = false
    this.disabledVeiculo = true
    this.tecnico.reset()
    this.orcamento.reset()
    this.formulario.controls["cliente"].reset();
    this.formulario.controls["veiculos"].reset();
    this.formularioAcao.reset();
    this.formularioOrcamento.reset();
    this.dataSourceCarrinhoServicos.data = [];
    this.dataSourceCarrinho.data = [];
    this.valorTotal = 0;
  }

  salvar() {
    if(this.validarFormularios()) {
      this.buildDto();
      this.osService.osSave(this.ordemServico).subscribe(res => {
        if(res){
          this.clearAll();
          this.toastNotification.success('A os foi salva com sucesso.');
          this.router.navigate(['os']);
        }
      })
    }
  }

  acaoOs() {

    if(this.acaoStatus == "Finalizar OS" ) {
      this.novaAcao = this.STATUS.finalizado
    } else {
      this.novaAcao = this.acaoStatus;
    } 
      this.desabilitaAcaoOs = true;
  }


  validarFormularios(){
    var valido = false;

    if(this.tecnico.value && this.tecnico.value !== '' && this.tecnico.value !== ""){
    this.formularioAcao.get('tecnicos').setValue(this.tecnico.value);
    }

    if(this.cliente.value && this.tecnico.value !== '' && this.tecnico.value !== "") {
      this.formulario.get('cliente').get('nome').setValue(this.cliente.value);
    }

    if(this.objOrcamento.id && this.formularioAcao.controls['orcamentos'].value == ""){
      this.formularioAcao.controls['orcamentos'].setValue(this.orcamento.value);
    }
    
    if(this.formulario.invalid) {
      this.clienteService.validateAllFormFields(this.formulario); 
    } else if(this.formularioAcao.invalid) {
        this.clienteService.validateAllFormFields(this.formularioAcao); 
    } else if(this.veiculo.value == null || this.veiculo.value == "" || this.veiculo.value == '') {
      this.toastNotification.warning('Você precisa inserir um veículo.')
    } else {
      if(this.formulario.valid && this.formularioAcao.valid) {
        valido = true;
      }  
    }

    

    return valido;
  }



  buildDto(){

    this.ordemServico.dataInicio =  this.id ? this.ordemServico.dataInicio : this.formulario.controls['dataInicio'].value;
    this.ordemServico.cliente = this.listaClientes.find(cli => cli.nome == this.cliente.value);
    this.ordemServico.veiculo = this.listaVeiculos.find( veic => veic.modelo == this.veiculo.value);
    this.ordemServico.problemas = this.formularioOrcamento.controls['problemas'].value;
    this.ordemServico.tecnico = this.listaTecnicos.find(tec => tec.nome == this.tecnico.value);
    this.ordemServico.orcamento = this.objOrcamento;
    this.ordemServico.status = this.ordemServico.status == undefined ? null : this.ordemServico.status;
    this.definirStatus();
  
  }


  definirStatus() {
    if(this.ordemServico.status !== null && this.ordemServico.status !== "") {
      if(this.ordemServico.status === this.STATUS.aguardando || this.ordemServico.status === "Aberto") {
        this.ordemServico.status = this.STATUS.executando;
      }
      if(this.ordemServico.status === this.STATUS.executando) {
        this.ordemServico.status = this.STATUS.executando;
      }
      if(this.novaAcao === this.STATUS.finalizado) {
        this.ordemServico.status = this.STATUS.finalizado;
      }
    } else {
      this.ordemServico.status = this.STATUS.aguardando;
    }
  
  };

  updateForm(os: any) {
    this.acaoStatus = this.definirAcaoStatus(os.status);
    const data = this.datepipe.transform(os.dataInicio, 'yyyy-MM-dd');
    os.cliente = os.orcamento.cliente;
    this.objOrcamento = os.orcamento;
    this.formulario.patchValue({
      cliente: os.orcamento.cliente,
      dataInicio: data,
      datafinal: os.orcamento.dataFinal,
      veiculos: os.orcamento.veiculo,
      servico: os.orcamento.servicos,
      problemas: os.orcamento.problemas
    });
    this.veiculo.setValue(os.veiculo.modelo);
    this.tecnico.setValue(os.tecnico.nome);
    this.orcamento.setValue('OC00' + os.orcamento.id);
    this.formularioOrcamento.controls['problemas'].setValue(os.problemas);

    this.dataSourceCarrinho.data = this.objOrcamento.produtos;
    this.dataSourceCarrinhoServicos.data = this.objOrcamento.servicos;
    this.valorTotal = this.objOrcamento.valorTotal;

    this.isVeiculo = true;
  }

  buildForm() {
    const data = new Date().toISOString().split('T')[0];
    this.formulario = this.fb.group({
      cliente: this.fb.group({
        id: [],
        nome: new FormControl(null, [Validators.required])
      }),
      dataInicio: [{ value: data, disabled: true }],
      datafinal: [{ value: null, disabled: true }],
      veiculos: [[Validators.required]],
      servico: [],
      problemas:[]
    })

    this.formularioAcao = new FormGroup({
      tecnicos: new FormControl('', [Validators.required]),
      orcamentos: new FormControl('', [Validators.required]),
    });


    this.formularioOrcamento = new FormGroup({
      problemas: new FormControl('', [Validators.required]),
      produtos: new FormControl('', [Validators.required]),
      servicos: new FormControl('', [Validators.required]),
    });
    
    
  }

  definirAcaoStatus(status: String){
    if(status === this.STATUS.aguardando || status === "Aberto") {
        return "EXECUTAR OS";
    }

    if(status === this.STATUS.executando) {
      return "Finalizar OS";
    } else {
      return '';
    }
  }

  goVeiculos() {
    if (this.objetoCliente.id) {
      this.router.navigate(['veiculo-form', this.objetoCliente.id]);
    } else {

    }
  }

  carregarItems() {
    this.itemService.getItem().subscribe(res => {
      this.listaItem = res;
    }, () => {
      this.toastNotification.error('Falha ao realizar pesquisa de Items, por favor tente novamente mais tarde.')
    });
  }
  carregarServicos() {
    this.servicoService.getServicos().subscribe(res => {
      this.listaServicos = res;
    }, () => {
      this.toastNotification.error('Falha ao realizar pesquisa de Serviços, por favor tente novamente mais tarde.')
    });
  }

  carregarTecnicos() {
    this.tecnicoService.getList().subscribe(res => {
      this.listaTecnicos = res;
      this.tecnicos = res;
      this.filteredTecnico();
    }, () => {
      this.toastNotification.error('Falha ao realizar pesquisa de Tecnicos, por favor tente novamente mais tarde.')
    });
  }
  carregarVeiculos() {
    this.veiculoService.getVeiculos().subscribe((res: VeiculoModel[]) => {
      this.listaVeiculos = res;
    }, () => {
      this.toastNotification.error('Falha ao realizar pesquisa de Veiculos, por favor tente novamente mais tarde.')
    });
  }

  carregarOrcamento() {
    this.orcamentoService.listAll().subscribe((res: OrcamentoModel[]) => {
      this.listaOrcamento = res;
      this.orcamentos = res;
      this.filteredOrcamento();
    }, () => {
      this.toastNotification.error('Falha ao realizar pesquisa do Orçamento, por favor tente novamente mais tarde.')
    });
  }

  carregarClientes() {
    this.clienteService.getCliente().subscribe(res => {
      this.listaClientes = res;
      this.clienteGroup = this.cliente.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    }, () => {
      this.toastNotification.error('Falha ao realizar pesquisa de Clientes, por favor tente novamente mais tarde.')
    });
  }

}

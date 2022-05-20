import { EnderecoModel } from '../../../models/cliente-models/endereco.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
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
import { OrcamentoModel } from 'src/app/models/orcamento.model';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { ProdutoModel } from 'src/app/models/produto.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-orcamento-form',
  templateUrl: './orcamento-form.component.html',
  styleUrls: ['../../../pages/cliente/cliente-form/cliente-form.component.scss', '../../../app.component.scss', '../orcamento.component.scss']
})
export class OrcamentoFormComponent implements OnInit {
  produtos = new MatTableDataSource<ProdutoModel>();
  servicos = new MatTableDataSource<ServicoModel>();
  dataSourceCarrinho = new MatTableDataSource<any>();
  dataSourceCarrinhoServicos = new MatTableDataSource<any>();
  prod: ProdutoModel = new ProdutoModel(null, 250, "estopa para limpeza", "estopa", "joli", "básicos", 2);
  orcamento: OrcamentoModel = new OrcamentoModel();
  listaClientes: ClienteModel[] = [];
  listaVeiculos: Array<VeiculoModel> = [];
  listaServicos: Array<ServicoModel> = [];
  listaProdutos: Array<ProdutoModel> = [];
  isVeiculo: boolean = false;
  disabledVeiculo: boolean = true
  valorTotal: number = 0;
  valorProdutos: number = 0;
  valorServicos: number = 0;

  listaServicosItens: Array<ServicoModel> = [];
  listaProdutosItens: Array<ProdutoModel> = [];


  clienteNome = new FormControl();
  cliente = new FormControl();
  veiculo = new FormControl();
  objetoCliente: ClienteModel;
  veiculos: Array<VeiculoModel>
  visualizar = false;

  id: number;

  valorCarrinho: number = 0;

  formulario: FormGroup;

  clienteGroup: Observable<ClienteModel[]>;
  veiculoGroup: Observable<VeiculoModel[]>;

  constructor(private clienteService: ClienteService,
    private service: OrcamentoService,
    private veiculoService: VeiculoService,
    private servicoService: ServicosService,
    private toastNotification: ToastrService,
    private produtoService: ProdutoService,
    private router: Router,
    private routeActivate: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    this.routeActivate.params.subscribe(
      (params: any) => {
        const id = params.id;
        if (id) {
          this.id = id;
          const orcamento$ = this.service.getOrcamentoById(id);
          this.visualizar = true;
          orcamento$.subscribe(orcamento => {
            this.updateForm(orcamento);
          });
        }
      }
    ); 
    this.carregarClientes();
    this.carregarVeiculos();
    this.carregarServicos();
    this.carregarProdutos();
  }

  updateForm(orcamento: any) {
    this.formulario.patchValue({
      cliente: orcamento.cliente,
      problemas: orcamento.problemas,
      produtos: orcamento.produtos,
      servico: orcamento.produtos,
      valorTotal: orcamento.valorToral,
      status: orcamento.status
    });
    this.valorTotal = orcamento.valorTotal
    this.dataSourceCarrinho.data = orcamento.produtos;
    this.dataSourceCarrinhoServicos.data = orcamento.servicos;
  }

  private _filter(value: string): ClienteModel[] {
    this.isVeiculo = false
    this.disabledVeiculo = true
    if (value !== null) {
      const filterValue = value.toLowerCase();
      this.objetoCliente = this.listaClientes.find(options => options.nome.toLowerCase().indexOf(filterValue) === 0);
      
      if( this.cliente.value != null && this.objetoCliente && this.objetoCliente.veiculos.length > 0){
        this.isVeiculo = true;
        this.veiculos = this.objetoCliente.veiculos;
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




  clearAll() {
    this.isVeiculo = false
    this.disabledVeiculo = true
    this.formulario.reset();
  }

  salvar() {
    
    if(this.cliente.value === '' || this.cliente.value  === null) {
      this.toastNotification.warning("Campo Cliente Obrigatório");
      } else {
        if(this.formulario.valid) {
          this.buildDto(); 
          this.service.saveOrcamento(this.orcamento).subscribe(res => {
            if(res){
              this.router.navigate(['/orcamento']);
              this.clearAll();
              this.toastNotification.success('O orçamento foi salva com sucesso.');
            }
          })
        };
      }
    
  }

  buildDto(){
    this.orcamento.cliente = this.listaClientes.find(cli => cli.nome == this.cliente.value);
    this.orcamento.problemas = this.formulario.controls['problemas'].value;
    this.orcamento.produtos = this.dataSourceCarrinho.data;
    this.orcamento.servicos = this.dataSourceCarrinhoServicos.data;
    this.orcamento.status = 1;
    this.orcamento.valorTotal = this.valorProdutos + this.valorServicos;
  }

  buildForm() {
    const data = new Date().toISOString().split('T')[0];
    this.formulario = this.fb.group({
      cliente: this.fb.group({
        id: new FormControl(null),
        nome: new FormControl(null)
      }),
      problemas: new FormControl(null, [Validators.required]),
      status: new FormControl(null),
      valorTotal: new FormControl(null),
      produtos: new FormControl(null),
      servico: new FormControl(null),
    })
  }



  excluir(id: number) {
    this.servicoService.excluir(id);
  }




  carregarProdutos() {
    this.produtoService.getProdutos().subscribe(res => {
     let listFiltro = res;
      listFiltro.forEach( data => {
        res.forEach( prod => {
          let index = listFiltro.findIndex(item => item === prod);
          if(data.nome == prod.nome && data.id != prod.id) {
            listFiltro.splice(index,1)                            
          }
        })
      });
      this.produtos.data = listFiltro;

    }, () => {
      this.toastNotification.error('Falha ao realizar pesquisa de Produtos, por favor tente novamente mais tarde.')
    });
  }
  carregarServicos() {
    this.servicoService.getServicos().subscribe(res => {
      let listFiltro = res;
      listFiltro.forEach( data => {
        res.forEach( prod => {
          let index = listFiltro.findIndex(item => item === prod);
      

          if(data.nome == prod.nome && data.id != prod.id) {
            listFiltro.splice(index,1)                            
          }
        })
      });
      this.servicos.data = listFiltro;
    }, () => {
      this.toastNotification.error('Falha ao realizar pesquisa de Serviços, por favor tente novamente mais tarde.')
    });
  }
  carregarVeiculos() {
    this.veiculoService.getVeiculos().subscribe((res: VeiculoModel[]) => {
      this.listaVeiculos = res;
    }, () => {
      this.toastNotification.error('Falha ao realizar pesquisa de Veiculos, por favor tente novamente mais tarde.')
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


  removeFromList(obj) {

    if (obj !== null && obj !=='') {
      let indexLista: number = this.listaProdutos.findIndex(item => item === obj);
      let index: number = this.dataSourceCarrinho.data.findIndex(item => item === obj);
      if (this.dataSourceCarrinho.data.includes(obj)) {
        this.dataSourceCarrinho.data.forEach( data => {
          data.qtd -=1;
          this.valorTotal -= data.valor;
          this.valorProdutos -= data.valor;
        if (data.qtd === 0) {
            this.listaProdutos.splice(indexLista, 1)
            this.valorProdutos = 0;
            this.dataSourceCarrinho.data.splice(index, 1);
        }
    
        })
      } 
    
    }
   
  }

  addFromList(obj) {
    if(obj === null && obj === '') {
      return;
    }

    this.dataSourceCarrinho.data.forEach( data => {
      if(data.nome === obj.nome) {
        data.qtd += 1;
        this.valorProdutos += data.valor;

      }
    })

    if(!this.dataSourceCarrinho.data.includes(obj)) {
      obj.qtd = 1;
      obj.id = null;
      this.valorProdutos += obj.valor;
      this.dataSourceCarrinho.data.push(obj);
      this.listaProdutos.push(obj);
    }
  }


  removeFromListServ(obj) {

    if (obj !== null && obj !=='') {
      let index: number = this.dataSourceCarrinhoServicos.data.findIndex(item => item === obj);
      if (this.dataSourceCarrinhoServicos.data.includes(obj)) {
        this.dataSourceCarrinhoServicos.data.forEach( data => {
          if(obj == data) {
            this.valorServicos -= data.valor
            this.dataSourceCarrinhoServicos.data.splice(index, 1);
          }  
        })
      }
    
    }
   
  }

  addFromListServ(obj) {
    if(obj === null && obj === '') {
      return;
    }

    this.dataSourceCarrinhoServicos.data.forEach( data => {
      if(data.nome === obj.nome) {
        this.toastNotification.info("Serviço já foi adicionado!");
      }
    })

    if(!this.dataSourceCarrinhoServicos.data.includes(obj)) {
      obj.id = null;
      this.valorServicos += obj.valor;
      this.dataSourceCarrinhoServicos.data.push(obj);
    }
  }


}

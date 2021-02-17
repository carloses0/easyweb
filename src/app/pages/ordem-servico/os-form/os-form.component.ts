import { EnderecoModel } from './../../../models/cliente-models/endereco.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import {startWith, map} from 'rxjs/operators';

@Component({
  selector: 'app-os-form',
  templateUrl: './os-form.component.html',
  styleUrls: ['./os-form.component.scss']
})
export class OsFormComponent implements OnInit {

  ordemServico: OrdemServicoModel
  listaClientes: ClienteModel[] = [];
  listaVeiculos: Array<VeiculoModel>
  listaServicos: Array<ServicoModel>
  listaItem: Array<ItemModel>

  formulario: FormGroup;

  clienteGroup: Observable<ClienteModel[]>;

  constructor( private clienteService: ClienteService,
               private veiculoService: VeiculoService,
               private servicoService: ServicosService,
               private toastNotification: ToastrService,
               private itemService: ItemService,
               private fb: FormBuilder
               ) { }

  ngOnInit() {
    this.buildForm();

    this.carregarClientes();
    this.carregarVeiculos();
    this.carregarServicos();
    this.carregarItems();
  }

  filteredClientes() {
    this.clienteGroup = this.formulario.get('cliente')!.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.nome),
      map(nome => nome ? this._filter(nome) : this.listaClientes.slice())
    );
  }

  displayFn(cliente: ClienteModel): string {
    return cliente && cliente.nome ? cliente.nome : '';
  }

  private _filter(nome: string): ClienteModel[] {
    const filterValue = nome.toLowerCase();

    return this.listaClientes.filter(cliente => cliente.nome.toLowerCase().indexOf(filterValue) === 0);
  }



  buildForm() {
    this.formulario = this.fb.group({
      dataInicio: [{value: new Date().getDate, disabled: true}],
      datafinal: [{value: null, disabled: true}],
      cliente: this.fb.group({
        id: [null],
        nome: [],
        cpfCnpj: [],
        veiculo: this.fb.group({
          id: [],
          placa: [],
          chassi: [],
          modelo: [],
          marca: [],
          ano: [],
          cor: [],
          quilometragem: [],
          motor: [],
        }),
        contato: this.fb.group({
          telefone: [],
          celular: [],
          email: [],
        }),
        enderecoModel: this.fb.group({
          id: [],
          logradouro: [],
          bairro: [],
          cep: [],
          cidade: [],
          uf: [],
          complemento: [],
          numero: [],
        })

      })
    })
  }


  clearAll() {
    this.formulario.reset();
  }

  salvar() {

  }






  carregarItems() {
    this.itemService.getItem().subscribe( res => {
      this.listaItem = res;
    }, () => {
      this.toastNotification.error('Falha ao realizar pesquisa de Items, por favor tente novamente mais tarde.')
    });
  }
  carregarServicos() {
    this.servicoService.getServicos().subscribe( res => {
      this.listaServicos = res;
    }, () => {
      this.toastNotification.error('Falha ao realizar pesquisa de Serviços, por favor tente novamente mais tarde.')
    });
  }
  carregarVeiculos() {
    this.veiculoService.getVeiculos().subscribe( (res: VeiculoModel[]) => {
      this.listaVeiculos = res;
    }, () => {
      this.toastNotification.error('Falha ao realizar pesquisa de Veiculos, por favor tente novamente mais tarde.')
    });
  }
  carregarClientes() {
    this.clienteService.getCliente().subscribe( res => {
      this.listaClientes = res;
    }, () => {
      this.toastNotification.error('Falha ao realizar pesquisa de Clientes, por favor tente novamente mais tarde.')
    });
  }

}

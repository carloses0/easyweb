import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/models/cliente-models/cliente.model';
import { VeiculoModel } from 'src/app/models/cliente-models/veiculo.model';
import { ItemModel, OrdemServicoModel } from 'src/app/models/ordem-servico.model';
import { ServicoModel } from 'src/app/models/servico.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ItemService } from 'src/app/services/item.service';
import { ServicosService } from 'src/app/services/servicos.service';
import { VeiculoService } from 'src/app/services/veiculo.service';

@Component({
  selector: 'app-os-form',
  templateUrl: './os-form.component.html',
  styleUrls: ['./os-form.component.scss']
})
export class OsFormComponent implements OnInit {

  ordemServico: OrdemServicoModel
  listaClientes: Array<ClienteModel>
  listaVeiculos: Array<VeiculoModel>
  listaServicos: Array<ServicoModel>
  listaItem: Array<ItemModel>

  constructor( private clienteService: ClienteService,
               private veiculoService: VeiculoService,
               private servicoService: ServicosService,
               private itemService: ItemService
               ) { }

  ngOnInit() {
    this.carregarClientes();
    this.carregarVeiculos();
    this.carregarServicos();
    this.carregarItems();
  }























  
  carregarItems() {
    throw new Error('Method not implemented.');
  }
  carregarServicos() {
    throw new Error('Method not implemented.');
  }
  carregarVeiculos() {
    throw new Error('Method not implemented.');
  }
  carregarClientes() {
    throw new Error('Method not implemented.');
  }

}

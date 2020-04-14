import { Component, OnInit } from '@angular/core';
import {ClienteService} from '../../../services/cliente.service';

import {MatTableDataSource} from '@angular/material';
import {ClienteModel} from '../../../models/cliente-models/cliente.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  constructor( private clienteService: ClienteService, private router: Router, private activateRoute: ActivatedRoute ) { }

  dataSource = new MatTableDataSource<ClienteModel>();

  displayedColumns: string[] = ['cpf/cnpj', 'nome', 'alterar'];


  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.clienteService.getCliente().subscribe( res => {
      this.dataSource.data = res;
    });
  }

  onEdit(id: any) {
    this.router.navigate(['cliente-form', id]);
  }

}

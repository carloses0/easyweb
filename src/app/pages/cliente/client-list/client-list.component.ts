import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ClienteService} from '../../../services/cliente.service';

import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ClienteModel} from '../../../models/cliente-models/cliente.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit, AfterViewInit {

  constructor( private clienteService: ClienteService, private router: Router, private activateRoute: ActivatedRoute ) { }

  dataSource = new MatTableDataSource<ClienteModel>();

  displayedColumns: string[] = ['cpf/cnpj', 'nome', 'alterar'];

  @ViewChild(MatPaginator, null) paginator: MatPaginator;


  ngOnInit() {
    this.getClientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

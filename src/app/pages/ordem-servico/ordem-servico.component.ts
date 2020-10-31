import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material";
import {ClienteModel} from "../../models/cliente-models/cliente.model";

@Component({
  selector: 'app-ordem-servico',
  templateUrl: './ordem-servico.component.html',
  styleUrls: ['./ordem-servico.component.scss']
})
export class OrdemServicoComponent implements OnInit {

  constructor() { }

  formulario: FormGroup;
  dataSource = new MatTableDataSource<ClienteModel>();
  displayedColumns: string[] = ['servico', 'duracao', 'cliente', 'preco', 'status'];

  ngOnInit() {
  }

}

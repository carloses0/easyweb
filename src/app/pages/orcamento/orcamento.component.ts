import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material";
import { Router } from '@angular/router';
import { OrcamentoModel } from 'src/app/models/orcamento.model';
import { OrdemServicoModel } from 'src/app/models/ordem-servico.model';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { OsService } from 'src/app/services/os.service';
import {ClienteModel} from "../../models/cliente-models/cliente.model";

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss', '.././cliente/client-list/client-list.component.scss']
})
export class OrcamentoComponent implements OnInit {

  constructor(private orcamentoService: OrcamentoService, private router: Router) {  }

  formulario: FormGroup;
  dataSource = new MatTableDataSource<OrcamentoModel>();
  displayedColumns: string[] = ['codigo', 'cliente', 'preco', 'status'];
  
  ngOnInit() {
    this.orcamentoService.listAll().subscribe( res => {
      this.dataSource.data = res;

    })
  }

  
  onEdit(id: any) {
    this.router.navigate(['orcamento-form', id]);
  }


}

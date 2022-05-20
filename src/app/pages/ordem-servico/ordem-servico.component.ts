import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material";
import { Router } from '@angular/router';
import { OrdemServicoModel } from 'src/app/models/ordem-servico.model';
import { OsService } from 'src/app/services/os.service';
import {ClienteModel} from "../../models/cliente-models/cliente.model";

@Component({
  selector: 'app-ordem-servico',
  templateUrl: './ordem-servico.component.html',
  styleUrls: ['./ordem-servico.component.scss']
})
export class OrdemServicoComponent implements OnInit {

  constructor(private osService: OsService, private router: Router) {  }

  formulario: FormGroup;
  dataSource = new MatTableDataSource<OrdemServicoModel>();
  dataSourcePesquisa = new MatTableDataSource<OrdemServicoModel>();
  pesquisa = new FormControl();
  displayedColumns: string[] = ['codigo','servico', 'cliente', 'preco', 'status'];
  
  ngOnInit() {
    this.osService.listAll().subscribe( res => {
      this.dataSource.data = res;

    })
  }


  onEdit(id: any) {
    this.router.navigate(['os-form', id]);
  }

  clearClientsAndVinc() {
    this.pesquisa.reset();
    this.dataSourcePesquisa.data = [];
    this.osService.listAll().subscribe( res => {
      this.dataSource.data = res;
    })
  }


  pesquisaOs() {
    this.osService.getById(this.pesquisa.value).subscribe( res =>{
      if(res !== null && res !== undefined && !this.dataSourcePesquisa.data.includes(res)){
        this.dataSourcePesquisa.data.push(res);
        if(this.dataSourcePesquisa.data.length > 0) {
          this.dataSource.data = this.dataSourcePesquisa.data;
      }
      }
    })

  }
  

}

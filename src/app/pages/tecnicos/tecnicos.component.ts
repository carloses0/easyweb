import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProdutoService} from "../../services/produto.service";
import {ToastrService} from "ngx-toastr";
import {ProdutoModel} from "../../models/produto.model";
import {MatTableDataSource} from "@angular/material";
import {ClienteModel} from "../../models/cliente-models/cliente.model";
import { TecnicoModel } from 'src/app/models/tecnicos.model';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { HttpHeaders } from '@angular/common/http';
import { ContatoModel } from 'src/app/models/cliente-models/contato.model';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.scss']
})
export class TecnicosComponent implements OnInit {


  formulario: FormGroup;
  tecnico: TecnicoModel;
  listTecnicos: TecnicoModel[] = [];

  pesquisaNome: String;

  dataSource = new MatTableDataSource<TecnicoModel>();
  displayedColumns: string[] = ['nome', 'cpf', 'contato'];

  constructor(private router: Router, private routeActivate: ActivatedRoute, private tecnicoService: TecnicoService, private toastNotification: ToastrService) {
 
  }

  ngOnInit() {
    this.initForm();
    this.listall();
  }


  initForm() {
    this.formulario = new FormGroup({
      nome: new FormControl(),
      cpf: new FormControl(),
      tempoExperiencia: new FormControl(),
      contato: new FormControl(),
    });
  }

  salvar() {
    this.buildForSave();
    this.onSalvar();
  }

  onSalvar() {
    this.tecnicoService.save(this.tecnico).subscribe(response => {
      if (response) {
        this.toastNotification.success(' Técnico foi salvo com sucesso.');
        this.listall();
        this.tecnico = null
      }
    }, error => this.toastNotification.error('Falha ao salvar, por favor tente novamente mais tarde.'));
  }

  buildForSave() {
     var contatoTecnico = new ContatoModel(this.formulario.controls['contato'].value);
    this.tecnico = new TecnicoModel(
      null,
      this.formulario.controls['nome'].value,
      this.formulario.controls['cpf'].value,
      this.formulario.controls['tempoExperiencia'].value,
      contatoTecnico
    );
  }

  excluirProduto(id: number) {

  }

  listall() {
    this.tecnicoService.getList().subscribe( response => {
        this.dataSource.data = response;
    });
  };


  pesquisarPorNome() {
    this.getByName(this.pesquisaNome);
  }

  getByName(name: String){
    let returnList: TecnicoModel[] = [];
      this.tecnicoService.getByName(name).subscribe( (tecnicoReturn: TecnicoModel) => {
          if(tecnicoReturn){
            returnList.push(tecnicoReturn);
          }
        this.dataSource.data = returnList;
      })
  }

  isCPF(): boolean{
    const value: string = this.formulario.controls.cpf.value
    if(value != null)
      console.log(value.length)
    return value == null ? true : value.length < 12 ? true : false;
   
  }

 getCpfCnpjMask(): string{
    return this.isCPF() ? '000.000.000-009' : '00.000.000/0000-00';
 }

}

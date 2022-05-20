import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrcamentoModel } from 'src/app/models/orcamento.model';
import { OrdemServicoModel } from 'src/app/models/ordem-servico.model';
import { UserModel } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { OsService } from 'src/app/services/os.service';
import {ClienteModel} from "../../models/cliente-models/cliente.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '.././cliente/client-list/client-list.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private toastNotification: ToastrService) {  }

  users: UserModel[] = [{login: "carlos123", senha:"carlos123"}];

  formulario: FormGroup;
  dataSource = new MatTableDataSource<OrcamentoModel>();
  hide = true;
  
  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.formulario = new FormGroup({
        login: new FormControl(null, [Validators.required]),
        senha: new FormControl(null, [Validators.required]),
  
      });
  }
  
  onEdit(id: any) {
    this.router.navigate(['orcamento-form', id]);
  }

  suporte(){
    this.toastNotification.warning("Atenção! Entre em contato com o suporte.");
  }

  login(){
    const usuario: UserModel = new UserModel(this.formulario.controls["login"].value, this.formulario.controls["senha"].value);
    if(this.users.some(u => u.login === usuario.login && u.senha === usuario.senha)){
      this.loginService.habilitado = true;
      this.router.navigate(['/os']);  
    } else {
      this.toastNotification.error("Login ou senha invalida!");
    }
  }


}

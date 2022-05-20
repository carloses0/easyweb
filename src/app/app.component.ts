import { environment } from './../environments/environment';
import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sistema de gerenciamento';
  ambiente: string;
  habilitado = true;

  constructor(public loginService: LoginService) {
    this.ambiente = environment.ambiente;
    this.habilitado = loginService.habilitado;
  }

  flag = false;
}

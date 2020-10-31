import { environment } from './../environments/environment';
import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sistema de gerenciamento';
  ambiente: string;

  constructor() {
    this.ambiente = environment.ambiente;
  }

  flag = false;
}

import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  constructor() {
  }

  formulario = new FormGroup({
    nome: new FormControl(''),
    cpfCnpj: new FormControl(''),
    endereco: new FormGroup({
      logradouro: new FormControl(''),
      bairro: new FormControl(''),
      numero: new FormControl(''),
      uf: new FormControl('')
    }),
    contato: new FormGroup({
      email: new FormControl(''),
      telefonePrincipal: new FormControl(''),
      telefoneSecundario: new FormControl(''),
    })
  });

  ngOnInit() {
  }

}

import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ClienteService} from "../../../services/cliente.service";
import {ClienteModel} from "../../../models/cliente-models/cliente.model";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  constructor(private clienteService: ClienteService) {
  }

  formularioCliente: FormGroup;
  formularioEndereco: FormGroup;
  formularioContato: FormGroup;
  cliente: any;


  ngOnInit() {
    this.initForms();
  }


  initForms() {
    this.formularioCliente = new FormGroup({
      nome: new FormControl(''),
      cpfCnpj: new FormControl(''),

    });

    this.formularioEndereco = new FormGroup({
      logradouro: new FormControl(''),
      cep: new FormControl(''),
      bairro: new FormControl(''),
      numero: new FormControl(''),
      uf: new FormControl(''),
      complemento: new FormControl('')
    });

    this.formularioContato = new FormGroup({
      email: new FormControl(''),
      telefone: new FormControl(''),
      celular: new FormControl(''),
    });
  }

  salvar() {
    const cliente = this.build();
    this.clienteService.saveCliente(cliente);
  }

  build() {

    this.cliente.nome = this.formularioCliente.controls['nome'].value;
    this.cliente.contato.telefone = this.formularioContato.controls['telefone'].value;
    this.cliente.contato.celular = this.formularioContato.controls['celular'].value;
    this.cliente.contato.email = this.formularioContato.controls['email'].value;
    this.cliente.endereco.bairro = this.formularioEndereco.controls['bairro'].value;
    this.cliente.endereco.cep = this.formularioEndereco.controls['cep'].value;
    this.cliente.endereco.numero = this.formularioEndereco.controls['numero'].value;
    this.cliente.endereco.complemento = this.formularioEndereco.controls['complemento'].value;
    this.cliente.endereco.uf = this.formularioEndereco.controls['uf'].value;
    this.cliente.endereco.logradouro = this.formularioEndereco.controls['logradouro'].value;
    return this.cliente;
  }

}

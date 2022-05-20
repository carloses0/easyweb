import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ClienteService} from '../../../services/cliente.service';
import {ClienteModel} from '../../../models/cliente-models/cliente.model';
import {ContatoModel} from '../../../models/cliente-models/contato.model';
import {EnderecoModel} from '../../../models/cliente-models/endereco.model';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {VeiculoModel} from "../../../models/cliente-models/veiculo.model";


@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss', '../../../app.component.scss']
})
export class ClienteFormComponent implements OnInit {

  constructor(private clienteService: ClienteService, private toastNotification: ToastrService, private router: Router, private routeActivate: ActivatedRoute) {
  }

  formularioCliente: FormGroup;
  formularioEndereco: FormGroup;
  formularioContato: FormGroup;
  cliente: ClienteModel;
  enderecos: EnderecoModel[] = [];
  id;
  clientes: Array<any>;
  habilitarVeiculos  = false;

  veiculos: VeiculoModel[] = [];

  ngOnInit() {
    this.initForms();
    this.routeActivate.params.subscribe(
      (params: any) => {
        const id = params.id;
        if (id) {
          this.habilitarVeiculos = true;
          this.id = id;
          const cliente$ = this.clienteService.getClienteById(id);
          cliente$.subscribe(cliente => {
            this.updateForm(cliente);
          });
        }
      }
    );
  }


  updateForm(cliente: any) {
    this.formularioCliente.patchValue({
      nome: cliente.nome,
      cpfCnpj: cliente.cpfCnpj
    });

    if (cliente.enderecos.length > 0) {
      this.formularioEndereco.patchValue({
        id: cliente.enderecos[0].id,
        logradouro: cliente.enderecos[0].logradouro,
        cep: cliente.enderecos[0].cep,
        bairro: cliente.enderecos[0].bairro,
        numero: cliente.enderecos[0].numero,
        uf: cliente.enderecos[0].uf,
        complemento: cliente.enderecos[0].complemento,
        cidade: cliente.enderecos[0].cidade
      });
    }

    if (cliente.contato) {
      this.formularioContato.patchValue({
        email: cliente.contato.email,
        telefone: cliente.contato.telefone,
        celular: cliente.contato.celular,
      });
    }
  }

  veiculosPage(id: number) {
    this.router.navigate(['veiculo-form', id]);
  }

  initForms() {
    this.formularioCliente = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      cpfCnpj: new FormControl(null, [Validators.required]),

    });

    this.formularioEndereco = new FormGroup({
      id: new FormControl(''),
      logradouro: new FormControl(''),
      cep: new FormControl(''),
      bairro: new FormControl(''),
      numero: new FormControl(''),
      uf: new FormControl(''),
      complemento: new FormControl(''),
      cidade: new FormControl('')
    });

    this.formularioContato = new FormGroup({
      email: new FormControl(''),
      telefone: new FormControl(''),
      celular: new FormControl(''),
    });
  }

  salvar() {
    if (this.formularioCliente.valid && this.formularioContato.valid && this.formularioEndereco.valid) {
      const cliente = this.build();

      if (cliente.id) {
        this.alterar(cliente);
      } else {
        this.salvarNovo(cliente);
      }
    } else {
      this.clienteService.validateAllFormFields(this.formularioCliente);

      if (this.formularioContato.invalid) {
        this.clienteService.validateAllFormFields(this.formularioContato);
      }

      if (this.formularioEndereco.invalid) {
        this.clienteService.validateAllFormFields(this.formularioEndereco);
      }
    }

  }

  alterar(cliente: ClienteModel) {

    this.clienteService.alterarCliente(cliente).subscribe(response => {
      if (response) {
        this.clearAll();
        this.toastNotification.success('O Cliente' + ' ' + response.nome + ', foi Alterado com sucesso.');
        this.router.navigate(['/cliente-list']);

      }
    }, error => this.toastNotification.error('Falha ao salvar, por favor tente novamente mais tarde.'));
  }

  salvarNovo(cliente: ClienteModel) {
    this.clienteService.saveCliente(cliente).subscribe(response => {
      if (response) {
        this.clearAll();
        this.toastNotification.success('O Cliente' + ' ' + response.nome + ', foi salvo com sucesso.');
        this.router.navigate(['/cliente-list']);

      }
    }, error => this.toastNotification.error('Falha ao salvar, por favor tente novamente mais tarde.'));
  }

  goVeiculos() {
    if (this.id) {
      this.router.navigate(['veiculo-form', this.id]);
    } else {

    }
  }

  build() {


    let contato = new ContatoModel(
      this.formularioContato.controls['telefone'].value,
      this.formularioContato.controls['celular'].value,
      this.formularioContato.controls['email'].value
    );

    let endereco = new EnderecoModel(
      this.formularioEndereco.controls['id'].value ? this.formularioEndereco.controls['id'].value : null,
      this.formularioEndereco.controls['logradouro'].value,
      this.formularioEndereco.controls['bairro'].value,
      this.formularioEndereco.controls['cep'].value,
      this.formularioEndereco.controls['cidade'].value,
      this.formularioEndereco.controls['uf'].value,
      this.formularioEndereco.controls['complemento'].value,
      this.formularioEndereco.controls['numero'].value,
    );

    this.enderecos.push(endereco);
    this.cliente = new ClienteModel(this.id ? +this.id : null,
      this.formularioCliente.controls['nome'].value,
      this.formularioCliente.controls['cpfCnpj'].value,
      contato,
      this.enderecos, this.veiculos);

    return this.cliente;
  }

  clearAll() {
    this.formularioCliente.reset();
    this.formularioEndereco.reset();
    this.formularioContato.reset();
    this.cliente = null;
    this.enderecos = [];
  }




  isCPF(): boolean{
    const value: string = this.formularioCliente.controls.cpfCnpj.value
    if(value != null)
      console.log(value.length)
    return value == null ? true : value.length < 12 ? true : false;
   
  }

 getCpfCnpjMask(): string{
    return this.isCPF() ? '000.000.000-009' : '00.000.000/0000-00';
 }

}

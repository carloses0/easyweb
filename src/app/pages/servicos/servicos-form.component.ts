import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ProdutoModel} from "../../models/produto.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ServicosService} from "../../services/servicos.service";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource, defaultRippleAnimationConfig} from "@angular/material";
import {ClienteModel} from "../../models/cliente-models/cliente.model";
import { ServicoModel } from 'src/app/models/servico.model';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos-form.component.html',
  styleUrls: ['../../pages/cliente/cliente-form/cliente-form.component.scss', '../../app.component.scss']
})
export class ServicosComponent implements OnInit {

  formulario: FormGroup;
  servico: ServicoModel;
  dataSource = new MatTableDataSource<ClienteModel>();
  displayedColumns: string[] = ['servico', 'duracao', 'preco'];
  constructor(private router: Router,
    private routeActivate: ActivatedRoute,
    private servicosService: ServicosService,
    private toastNotification: ToastrService,
    private clienteService: ClienteService) { }

  id: number;





  ngOnInit() {
    this.initForm();
    this.routeActivate.params.subscribe(
      (params: any) => {
        const id = params.id;
        if (id) {
          this.id = id;
          const servico$ = this.servicosService.getServicosById(id);
          servico$.subscribe(servico => {
            this.updateForm(servico);
          });
        }
      }
    );
  }

  initForm() {
    this.formulario = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      tipo: new FormControl(null, [Validators.required]),
      descricao: new FormControl(null, [Validators.required]),
      valor: new FormControl(null, [Validators.required]),
      duracao: new FormControl(null, [Validators.required]),
    });
  }


  updateForm(servico: any) {
    this.formulario.patchValue({
      nome: servico.nome,
      tipo: servico.tipo,
      descricao: servico.descricao,
      valor: servico.valor,
      duracao: servico.duracao
    });
  }

  veiculosPage(id: number) {
    this.router.navigate(['veiculo-form', id]);
  }


  salvar() {
    if (this.formulario.valid ) {
      const servico = this.build();

      if (servico.id) {
        this.alterar(servico);
      } else {
        this.salvarNovo(servico);
      }
    } else {
      this.clienteService.validateAllFormFields(this.formulario);
    }

  }

  alterar(servico: any) {

    this.servicosService.alterarServico(servico).subscribe(response => {
      if (response) {
        this.clearAll();
        this.toastNotification.success('O Cliente' + ' ' + response.nome + ', foi Alterado com sucesso.');
        this.router.navigate(['/servicos-list']);

      }
    }, error => this.toastNotification.error('Falha ao salvar, por favor tente novamente mais tarde.'));
  }

  salvarNovo(servico: ServicoModel) {
    if(!servico) {
      servico = this.build();
    }
    this.servicosService.saveServico(servico).subscribe(response => {
      if (response) {
        this.clearAll();
        this.toastNotification.success('Serviço' + ' ' + response.nome + ', foi salvo com sucesso.');
        this.router.navigate(['/servicos-list']);

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
    var valor = this.formulario.controls['valor'].value * this.formulario.controls['duracao'].value;
    this.servico = new ServicoModel(this.id ? +this.id : null,
      this.formulario.controls['nome'].value,
      this.formulario.controls['tipo'].value,
      this.formulario.controls['descricao'].value,
      valor,
      this.formulario.controls['duracao'].value);

    return this.servico;
  }

  clearAll() {
    this.formulario.reset();
    this.servico = null;
  }

}

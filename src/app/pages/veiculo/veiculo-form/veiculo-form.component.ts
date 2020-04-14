import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router, RouterState} from '@angular/router';
import {ClienteService} from '../../../services/cliente.service';
import {VeiculoModel} from '../../../models/cliente-models/veiculo.model';
import {ClienteModel} from '../../../models/cliente-models/cliente.model';
import {ToastrService} from "ngx-toastr";
import {VeiculoService} from "../../../services/veiculo.service";

@Component({
  selector: 'app-veiculo-form',
  templateUrl: './veiculo-form.component.html',
  styleUrls: ['./veiculo-form.component.scss']
})
export class VeiculoFormComponent implements OnInit {

  formularioVeiculo: FormGroup;
  idCliente: number;
  veiculos: VeiculoModel[];
  id;
  cliente: ClienteModel;
  veiculo: VeiculoModel;

  constructor(private router: Router, private routeActivate: ActivatedRoute, private clienteService: ClienteService, private toastNotification: ToastrService,
              private veiculoService: VeiculoService) {
  }

  ngOnInit() {
    this.initForm();
    this.routeActivate.params.subscribe(
      (params: any) => {
        this.id = params.id;
        if (this.id) {
          const cliente$ = this.clienteService.getClienteById(this.id);
          cliente$.subscribe((cliente: ClienteModel) => {
            this.getListVeiculos(cliente);
          });
        }
      }
    );

  }


  salvarVeiculo(placa: string) {
    this.buildForSave(placa);

    this.onSalvar();

  }

  onSalvar() {
    this.clienteService.alterarCliente(this.cliente).subscribe(response => {
      if (response) {
        this.toastNotification.success(' Veículo foi salvo com sucesso.');
        this.router.navigate(['/cliente-list']);

      }
    }, error => this.toastNotification.error('Falha ao salvar, por favor tente novamente mais tarde.'));
  }

  buildForSave(placa: string) {

    if (this.formularioVeiculo.valid) {

      this.formToModel(this.formularioVeiculo.controls['id'].value);

      if (this.formularioVeiculo.controls['id'].value && this.cliente.veiculos.length > 0) {
        this.cliente.veiculos.forEach(v => {
          if (v.id === this.veiculo.id) {

            this.cliente.veiculos[this.cliente.veiculos.indexOf(v)] = this.veiculo;
          }
        });

      } else {
        this.cliente.veiculos.push(this.veiculo);
      }
    } else {
      this.clienteService.validateAllFormFields(this.formularioVeiculo);
    }
  }

  formToModel(id: number) {
    this.veiculo = new VeiculoModel(id ? id : null,
      this.formularioVeiculo.controls['placa'].value,
      this.formularioVeiculo.controls['chassi'].value,
      this.formularioVeiculo.controls['modelo'].value,
      this.formularioVeiculo.controls['marca'].value,
      this.formularioVeiculo.controls['cor'].value,
      this.formularioVeiculo.controls['ano'].value,
      this.formularioVeiculo.controls['quilometragem'].value,
      this.formularioVeiculo.controls['motor'].value,
      null);
  }


  updateForm(veiculo: VeiculoModel) {
    this.formularioVeiculo.patchValue({
      id: veiculo.id ? veiculo.id : null,
      placa: veiculo.placa,
      chassi: veiculo.chassi,
      modelo: veiculo.modelo,
      marca: veiculo.marca,
      cor: veiculo.cor,
      ano: veiculo.ano,
      quilometragem: veiculo.quilometragem,
      motor: veiculo.motor
    });
  }

  onChangeVeiculo(event: VeiculoModel) {
    this.updateForm(event);
  }

  getListVeiculos(cliente: ClienteModel) {
    this.cliente = cliente;
    this.veiculos = cliente.veiculos;
    if (this.veiculos.length > 0) {
      this.veiculo = this.veiculos[0];
      this.updateForm(this.veiculo);
    }
  }


  excluirVeiculo(id: number) {
    this.cliente.veiculos.forEach(v => {
      if (v.id === id) {
        this.cliente.veiculos.splice(this.cliente.veiculos.indexOf(v), 1);
        this.clienteService.alterarCliente(this.cliente).subscribe(response => {
          if (response) {
            this.toastNotification.success(' Veículo foi excluído com sucesso.');
            this.getListVeiculos(this.cliente);
            this.veiculo = null; this.formularioVeiculo.reset();

          }
        }, error => this.toastNotification.error('Falha ao salvar, por favor tente novamente mais tarde.'));
      }
    });
  }


  initForm() {
    this.formularioVeiculo = new FormGroup({
      id: new FormControl(),
      placa: new FormControl(),
      chassi: new FormControl(),
      modelo: new FormControl(),
      marca: new FormControl(),
      cor: new FormControl(),
      ano: new FormControl(),
      quilometragem: new FormControl(),
      motor: new FormControl()
    });
  }


}

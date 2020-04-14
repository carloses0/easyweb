import {ClienteModel} from "./cliente.model";

export class VeiculoModel {
  id: number;
  placa: string;
  chassi: string;
  modelo: string;
  marca: string;
  ano: string;
  cor: string;
  quilometragem: string;
  motor: string;
  cliente: ClienteModel;

  constructor(id: number, placa: string, chassi: string, modelo: string, marca: string, ano: string, cor: string, quilometragem: string, motor: string , cliente: ClienteModel) {
    this.id = id;
    this.placa = placa;
    this.chassi = chassi;
    this.modelo = modelo;
    this.marca = marca;
    this.ano = ano;
    this.cor = cor;
    this.quilometragem = quilometragem;
    this.motor = motor;
    this.cliente = cliente;

  }
}

import {ContatoModel} from './contato.model';
import {EnderecoModel} from './endereco.model';
import {VeiculoModel} from "./veiculo.model";

export class ClienteModel {
  id: number;
  nome: string;
  cpfCnpj: string;
  veiculos: VeiculoModel[];
  contato: ContatoModel;
  enderecos: EnderecoModel[];


  constructor(id: number, nome: string, cpfCnpj: string, contato: ContatoModel, enderecos: EnderecoModel[], veiculos: VeiculoModel[]) {
    this.id = id;
    this.nome = nome;
    this.cpfCnpj = cpfCnpj;
    this.enderecos = enderecos;
    this.contato = contato;
    this.veiculos = veiculos;
  }
}

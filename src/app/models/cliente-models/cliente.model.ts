import {ContatoModel} from './contato.model';
import {EnderecoModel} from './endereco.model';

export class ClienteModel {
  id: number;
  nome: string;
  cpfCnpj: string;
  endereco: EnderecoModel;
  contato: ContatoModel;


  constructor(id: number, nome: string, cpfCnpj: string, endereco: EnderecoModel, contato: ContatoModel) {
    this.id = id;
    this.nome = nome;
    this.cpfCnpj = cpfCnpj;
    this.endereco = endereco;
    this.contato = contato;
  }
}

import { ContatoModel } from "./cliente-models/contato.model";

export class TecnicoModel {
    id: number;
    nome: string;
    cpf: string;
    tempoExperiencia: string;
    contato: ContatoModel;
  
  
    constructor(id: number, nome: string, cpf: string, tempoExperiencia: string, contato: ContatoModel) {
      this.id = id;
      this.nome = nome;
      this.cpf = cpf;
      this.nome = nome;
      this.tempoExperiencia = tempoExperiencia;
      this.contato = contato;
    }
  }
  
export class ServicoModel {
  id: number;
  nome: string;
  tipo: string;
  descricao: string;
  valor: number;
  duracao: string;


  constructor(id: number, nome: string, tipo: string, descricao: string, valor: number, duracao: string) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
    this.duracao = duracao;

  }
}

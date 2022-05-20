export class ProdutoModel {
  id: number;
  valor: number;
  descricao: string;
  nome: string;
  marca: string;
  categoria: string;
  qtd: number;


  constructor(id: number, valor: number, descricao: string, nome: string, marca: string, categoria: string, qtd?: number) {
    this.id = id;
    this.valor = valor;
    this.descricao = descricao;
    this.nome = nome;
    this.marca = marca;
    this.categoria = categoria;
    this.qtd = qtd;
  }
}

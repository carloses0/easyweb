
export class EnderecoModel {
  id: number;
  logradouro: string;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
  complemento: string;
  numero: string;


  constructor(id: number, logradouro: string, bairro: string, cep: string, cidade: string, uf: string, complemento: string, numero: string) {
    this.id = id;
    this.logradouro = logradouro;
    this.bairro = bairro;
    this.cep = cep;
    this.cidade = cidade;
    this.uf = uf;
    this.complemento = complemento;
    this.numero = numero;
  }
}

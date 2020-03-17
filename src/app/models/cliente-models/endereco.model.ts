
export class EnderecoModel {
  uf: string;
  bairro: string;
  numero: string;
  cidade: string;
  complemento: string;
  cep: string;
  logradouro: string;


  constructor(uf: string, bairro: string, numero: string, cidade: string, complemento: string, cep: string, logradouro: string) {
    this.uf = uf;
    this.bairro = bairro;
    this.numero = numero;
    this.cidade = cidade;
    this.complemento = complemento;
    this.cep = cep;
    this.logradouro = logradouro;
  }
}

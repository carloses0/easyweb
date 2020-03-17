
export class ContatoModel {
  email: string;
  telefone: number;
  celular: number;


  constructor(email: string, telefone: number, celular: number) {
    this.email = email;
    this.telefone = telefone;
    this.celular = celular;
  }
}

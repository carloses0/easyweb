
export class ContatoModel {
  telefone: string;
  celular: string;
  email: string;


  constructor(telefone: string, celular: string, email: string) {
    this.telefone = telefone;
    this.celular = celular;
    this.email = email;
  }
}

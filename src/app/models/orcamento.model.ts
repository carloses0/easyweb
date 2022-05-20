import { ClienteFormComponent } from "../pages/cliente/cliente-form/cliente-form.component";
import { ClienteModel } from "./cliente-models/cliente.model";
import { ProdutoModel } from "./produto.model";
import { ServicoModel } from "./servico.model";

export class OrcamentoModel {
    id: number;
    produtos: Array<ProdutoModel>; 
    servicos: Array<ServicoModel>;
    valorTotal: number;
    status: number;
    problemas: string;
    cliente: ClienteModel;


    constructor(id?: number, produtos?: Array<ProdutoModel>, servicos?: Array<ServicoModel>, valorTotal?:number, status?: number, problemas?: string,cliente?: ClienteModel) {
        this.id = id;
        this.produtos = produtos;
        this.servicos = servicos;
        this.valorTotal = valorTotal;
        this.status = status;
        this.problemas = problemas;
        this.cliente = cliente;
    }
}
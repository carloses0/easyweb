import { ClienteFormComponent } from "../pages/cliente/cliente-form/cliente-form.component";
import { ClienteModel } from "./cliente-models/cliente.model";
import { VeiculoModel } from "./cliente-models/veiculo.model";
import { OrcamentoModel } from "./orcamento.model";
import { ProdutoModel } from "./produto.model";
import { ServicoModel } from "./servico.model";
import { TecnicoModel } from "./tecnicos.model";

export class OrdemServicoModel {
    id: number;
    dataInicio: Date;
    dataFinal: Date;
    cliente: ClienteModel;
    veiculo: VeiculoModel;
    servicos: Array<ServicoModel>;
    itens: Array<ItemModel>;
    orcamento: OrcamentoModel;
    status: string;
    problemas: string;
    tecnico: TecnicoModel;

    constructor(id?: number, dataInicio?: Date, dataFinal?: Date, cliente?: ClienteModel, veiculo?: VeiculoModel, servicos?: Array<ServicoModel>, itens?: Array<ItemModel>, orcamento?: OrcamentoModel, status?: string, problemas?: string, tecnico?: TecnicoModel) {
        this.id = id;
        this.dataInicio = dataInicio;
        this.dataFinal = dataFinal;
        this.cliente = cliente;
        this.veiculo = veiculo;
        this.servicos = servicos;
        this.itens = itens;
        this.orcamento = orcamento;
        this.status = status;
        this.problemas = problemas;
        this.tecnico = tecnico;
    }


    
}

export class ItemModel {
    id: number;
    qtd: number;
    produto: ProdutoModel;
}
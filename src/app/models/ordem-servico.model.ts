import { ClienteFormComponent } from "../pages/cliente/cliente-form/cliente-form.component";
import { ClienteModel } from "./cliente-models/cliente.model";
import { VeiculoModel } from "./cliente-models/veiculo.model";
import { ProdutoModel } from "./produto.model";
import { ServicoModel } from "./servico.model";

export class OrdemServicoModel {
    id: number;
    dateInicio: string;
    dataFinal: string;
    cliente: ClienteModel;
    veiculo: VeiculoModel;
    servicos: Array<ServicoModel>;
    itens: Array<ItemModel>;
    orcamento: number;
    status: string;

}

export class ItemModel {
    id: number;
    qtd: number;
    produto: ProdutoModel;
}
import { ServicosListComponent } from './pages/servicos/servicos-list/servicos-list/servicos-list.component';
import { ClienteFormComponent } from './pages/cliente/cliente-form/cliente-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientListComponent} from './pages/cliente/client-list/client-list.component';
import {VeiculoFormComponent} from './pages/veiculo/veiculo-form/veiculo-form.component';
import {OrdemServicoComponent} from './pages/ordem-servico/ordem-servico.component';
import {ProdutosComponent} from "./pages/produtos/produtos.component";
import {ServicosComponent} from "./pages/servicos/servicos-form.component";
import { OsFormComponent } from './pages/ordem-servico/os-form/os-form.component';
import { TecnicosComponent } from './pages/tecnicos/tecnicos.component';
import { OrcamentoComponent } from './pages/orcamento/orcamento.component';
import { OrcamentoFormComponent } from './pages/orcamento/orcamento-form/orcamento-form.component';
import { AreaComponent } from './pages/area/area.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'},
  {path: 'cliente-form' , component: ClienteFormComponent },
  {path: 'cliente-list', component: ClientListComponent},
  {path: 'cliente-form/:id', component: ClienteFormComponent},
  {path: 'veiculo-form/:id', component: VeiculoFormComponent},
  {path: 'os', component: OrdemServicoComponent},
  {path: 'os-form', component: OsFormComponent},
  {path: 'os-form/:id', component: OsFormComponent},
  {path: 'produtos', component: ProdutosComponent},
  {path: 'servicos-form', component: ServicosComponent},
  {path: 'servicos-form/:id', component: ServicosComponent},
  {path: 'servicos-list', component: ServicosListComponent},
  {path: 'tecnico', component: TecnicosComponent},
  {path: 'orcamento-form', component: OrcamentoFormComponent},
  {path: 'orcamento-form/:id', component: OrcamentoFormComponent},
  {path: 'orcamento', component: OrcamentoComponent},
  {path: 'dashBoard', component: AreaComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

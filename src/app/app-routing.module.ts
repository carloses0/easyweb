import { ClienteFormComponent } from './pages/cliente/cliente-form/cliente-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientListComponent} from './pages/cliente/client-list/client-list.component';
import {VeiculoFormComponent} from './pages/veiculo/veiculo-form/veiculo-form.component';
import {OrdemServicoComponent} from './pages/ordem-servico/ordem-servico.component';


const routes: Routes = [
  {path: 'cliente-form' , component: ClienteFormComponent },
  {path: 'cliente-list', component: ClientListComponent},
  {path: 'cliente-form/:id', component: ClienteFormComponent},
  {path: 'veiculo-form/:id', component: VeiculoFormComponent},
  {path: 'ordem-servico', component: OrdemServicoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

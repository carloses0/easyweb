import { MaterialModule } from './materialComponentes/material/material.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuLeftComponent } from './pages/menu-left/menu-left.component';
import { ClienteFormComponent } from './pages/cliente/cliente-form/cliente-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { ClientListComponent } from './pages/cliente/client-list/client-list.component';
import { VeiculoFormComponent } from './pages/veiculo/veiculo-form/veiculo-form.component';
import { OrdemServicoComponent } from './pages/ordem-servico/ordem-servico.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ServicosComponent } from './pages/servicos/servicos-form.component';
import { MenusComponent } from './pages/menus/menus.component';
import { RootNavComponent } from './root-nav/root-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ServicosListComponent } from './pages/servicos/servicos-list/servicos-list/servicos-list.component';
import { ProdutosListComponent } from './pages/produtos/produtos-list/produtos-list/produtos-list.component';
import { OsFormComponent } from './pages/ordem-servico/os-form/os-form.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { TecnicosComponent } from './pages/tecnicos/tecnicos.component';
import { OrcamentoFormComponent } from './pages/orcamento/orcamento-form/orcamento-form.component';
import { OrcamentoComponent } from './pages/orcamento/orcamento.component';
import { MatBadgeModule } from '@angular/material/badge';
import { DatePipe } from '@angular/common';
import { AreaComponent } from './pages/area/area.component';
import { LoginComponent } from './pages/login/login.component';



const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};
@NgModule({
  declarations: [
    AppComponent,
    MenuLeftComponent,
    ClienteFormComponent,
    ClientListComponent,
    VeiculoFormComponent,
    OrdemServicoComponent,
    ProdutosComponent,
    ServicosComponent,
    MenusComponent,
    RootNavComponent,
    ServicosListComponent,
    ProdutosListComponent,
    OsFormComponent,
    TecnicosComponent,
    OrcamentoFormComponent,
    OrcamentoComponent,
    AreaComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    NgxMaskModule.forRoot(maskConfigFunction),
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

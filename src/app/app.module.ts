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

@NgModule({
  declarations: [
    AppComponent,
    MenuLeftComponent,
    ClienteFormComponent,
    ClientListComponent,
    VeiculoFormComponent,
    OrdemServicoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

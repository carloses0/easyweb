import { ServicoModel } from './../models/servico.model';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs/operators";
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ServicosService {
   apiUrl: string = environment.URL_SERVER_API + 'servicos';


  constructor(private http: HttpClient) {
   }

  saveServico(servico: ServicoModel) {return this.http.post<ServicoModel>(this.apiUrl + '/save', servico); }

  alterarServico(servico: ServicoModel) {return this.http.put<ServicoModel>(this.apiUrl + '/update', servico); }

  getServicos() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getServicosById(id) {
    return this.http.get(this.apiUrl + '/' + id).pipe(take(1));
  }

  getServicosByName(name) {
    return this.http.get(this.apiUrl + '/findByName/' + name).pipe(take(1));
  }
}

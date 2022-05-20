import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {take} from "rxjs/operators";
import {ProdutoModel} from "../models/produto.model";
import { TecnicoModel } from '../models/tecnicos.model';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  apiUrl = 'http://localhost:8080/tecnicos/';

  constructor(private http: HttpClient) {
   
   }
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  save(tecnico: TecnicoModel) {
    return this.http.post<TecnicoModel>(this.apiUrl, tecnico, this.httpOptions); 
  }

  alterar(tecnico: TecnicoModel) {return this.http.put<TecnicoModel>(this.apiUrl, tecnico); }

  getList() {
    return this.http.get<TecnicoModel[]>(this.apiUrl);
  }

  getById(id) {
    return this.http.get(this.apiUrl + '/' + id).pipe(take(1));
  }

  getByName(name) {
    return this.http.get(this.apiUrl + '/findByName/' + name).pipe(take(1));
  }
}

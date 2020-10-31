import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs/operators";
import {ProdutoModel} from "../models/produto.model";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  apiUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) { }

  saveProduto(produto: ProdutoModel) {return this.http.post<ProdutoModel>(this.apiUrl + '/save', produto); }

  alterarCliente(produto: ProdutoModel) {return this.http.put<ProdutoModel>(this.apiUrl, produto); }

  getProdutos() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProdutoById(id) {
    return this.http.get(this.apiUrl + '/' + id).pipe(take(1));
  }

  getProdutoByName(name) {
    return this.http.get(this.apiUrl + '/findByName/' + name).pipe(take(1));
  }
}

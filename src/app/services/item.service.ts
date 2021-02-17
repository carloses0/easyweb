import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs/operators";
import {ProdutoModel} from "../models/produto.model";
import { ItemModel } from '../models/ordem-servico.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  apiUrl = 'http://localhost:8080/items';

  constructor(private http: HttpClient) { }

  saveProduto(item: ItemModel) {return this.http.post<ItemModel>(this.apiUrl + '/save', item); }

  alterarCliente(item: ItemModel) {return this.http.put<ItemModel>(this.apiUrl, item); }

  getItem() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getItemById(id) {
    return this.http.get(this.apiUrl + '/' + id).pipe(take(1));
  }

  getItemByName(name) {
    return this.http.get(this.apiUrl + '/findByName/' + name).pipe(take(1));
  }
}

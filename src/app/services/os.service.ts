import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injector } from "@angular/core";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { OrdemServicoModel } from "../models/ordem-servico.model";


@Injectable({
    providedIn:'root'
})


export class OsService {
    
    apiUrl: string = environment.URL_SERVER_API + 'ordemServico';

    constructor(private http: HttpClient, injector: Injector) {
  
    }

    httpOptions = {
      headers: { "Content-Type": "application/json", Accept: "application/pdf" }

      };

      
    getById(id) {
      return this.http.get<OrdemServicoModel>(this.apiUrl + '/' + id).pipe(take(1));
    }

      osSave(os: OrdemServicoModel) { return this.http.post<OrdemServicoModel>(this.apiUrl + '/save', os)}

      listAll() {
        return this.http.get<OrdemServicoModel[]>(this.apiUrl)
      }
}
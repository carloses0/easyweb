import { Injectable, Injector } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    apiUrl: string = environment.URL_SERVER_API + 'ordemServico';

    constructor(private http: HttpClient, injector: Injector) {
  
    }

    habilitado = false;

    httpOptions = {
      headers: { "Content-Type": "application/json", Accept: "application/pdf" }

      };

      
    getById(id) {
      return this.http.get<any>(this.apiUrl + '/' + id).pipe(take(1));
    }

      osSave(os: any) { return this.http.post<any>(this.apiUrl + '/save', os)}

      listAll() {
        return this.http.get<any[]>(this.apiUrl)
      }
}

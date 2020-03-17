import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {ClienteModel} from "../models/cliente-models/cliente.model";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  apiUrl = 'http:localhost:8080';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  saveCliente(cliente: ClienteModel): Observable<ClienteModel> {
    return this.http.post<ClienteModel>(this.apiUrl + '/clientes', JSON.stringify(cliente), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }







  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

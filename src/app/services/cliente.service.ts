import { environment } from './../../environments/environment'
import { Injectable, Injector } from '@angular/core';
import {Http, Response} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError, from} from 'rxjs';
import {ClienteModel} from '../models/cliente-models/cliente.model';
import {catchError, retry, take} from 'rxjs/operators';
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})


export class ClienteService  {

  apiUrl: string = environment.URL_SERVER_API + 'clientes';

  constructor(private http: HttpClient, injector: Injector) {

}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  saveCliente(cliente: ClienteModel) {return this.http.post<ClienteModel>(this.apiUrl + '/save', cliente); }

  alterarCliente(cliente: ClienteModel) {return this.http.put<ClienteModel>(this.apiUrl, cliente); }

  getCliente() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getClienteById(id) {
    return this.http.get(this.apiUrl + '/' + id).pipe(take(1));
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

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}

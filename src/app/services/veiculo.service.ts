import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VeiculoModel} from "../models/cliente-models/veiculo.model";

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:8080/veiculos';


  alterarVeiculo(veiculo: VeiculoModel) {return this.http.put<VeiculoModel>(this.apiUrl, veiculo); }

  getVeiculos() {return this.http.get<VeiculoModel[]>(this.apiUrl);}
}

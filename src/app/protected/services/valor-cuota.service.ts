import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ValorCuotaService {
  private baseUrl = environment.baseURL;

  constructor(private http: HttpClient) {}

  //Listado de valores de cuota
  listadoValores() {
    const url = `${this.baseUrl}`;
  }
}

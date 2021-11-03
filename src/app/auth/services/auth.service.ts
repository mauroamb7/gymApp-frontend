import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { AuthResponse, Usuario } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseURL;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {}

  //Obtener informacion del payload del jwt
  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  //Login service
  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth/login`;
    const body = {
      email,
      password,
    };
    return this.http.post<AuthResponse>(url, body).pipe(
      //Guardamos el usuario
      tap((user) => {
        //verificamos respuesta exitosa
        if (user.ok) {
          //obtenemos payload
          const payload = this.parseJwt(user.token!);

          this._usuario = {
            nombre: user.nombre!,
            uid: payload.uid,
          };
        }
      }),
      //Transformamos la respuesta para tener solo el campo 'ok'
      map((resp) => resp.ok),
      //Devolvemos el 'ok:false' si hay error pasado como observable
      catchError((err) => of(false))
    );
  }
}

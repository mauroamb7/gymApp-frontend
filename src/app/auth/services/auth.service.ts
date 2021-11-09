import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
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
          // guardamos token en localstorage
          localStorage.setItem('token', user.token!);

          this._usuario = {
            nombre: user.nombre!,
            uid: user.uid!,
            rol: user.rol!,
          };
        }
      }),
      //Transformamos la respuesta para tener solo el campo 'ok'
      map((resp) => resp.ok),
      //Devolvemos 'false' si hay error pasado como observable
      catchError((err) => of(err.error.msg))
    );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((resp) => {
        // guardamos token en localstorage
        localStorage.setItem('token', resp.token!);

        this._usuario = {
          nombre: resp.nombre!,
          uid: resp.uid!,
          rol: resp.rol!,
        };
        console.log(resp);

        return resp.ok;
      }),
      catchError((err) => of(false))
    );
  }

  logout() {
    localStorage.clear();
  }

  registrar(
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    dni: number
  ) {
    const url = `${this.baseUrl}/user`;
    const body = { nombre, apellido, email, password, dni };

    return this.http.post<AuthResponse>(url, body).pipe(
      //Transformamos la respuesta para tener solo el campo 'ok'
      map((resp) => {
        return resp.ok;
      }),
      catchError((err) => of(err.error.msg))
    );
  }
}

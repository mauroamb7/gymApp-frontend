import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { AuthResponse, Usuario } from '../interfaces/auth.interface';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseURL;
  private _usuario!: Usuario;
  private loggedIn = new BehaviorSubject<boolean>(false);

  get usuario() {
    return { ...this._usuario };
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) {
    this.checkToken();
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
          // guardamos token en localstorage
          localStorage.setItem('token', user.token!);

          //Seteamos loggedIn
          this.loggedIn.next(true);

          this._usuario = {
            nombre: user.nombre!,
            uid: user.uid!,
            rol: user.rol!,
          };
        }
      }),
      //Transformamos la respuesta para tener solo el campo 'ok'
      map((resp) => resp.ok),
      //Devolvemos el mensaje de error como observable
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
    localStorage.removeItem('token');
    //Seteamos loggedIn
    this.loggedIn.next(false);
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

  private checkToken() {
    const userToken = localStorage.getItem('token');
    let isExpired = helper.isTokenExpired(userToken!);

    isExpired ? this.logout() : this.loggedIn.next(true);
  }
}

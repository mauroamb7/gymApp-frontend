import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../../environments/environment';
import {
  UserList,
  userResponse,
  Usuario,
} from '../interfaces/userList.interface';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) {}

  listUsuarios() {
    const url = `${this.baseUrl}/user/clientes`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<UserList>(url, { headers });
  }

  getUserById(id: string) {
    const url = `${this.baseUrl}/user/${id}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<userResponse>(url, { headers });
  }
}

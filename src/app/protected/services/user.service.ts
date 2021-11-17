import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { UserList } from '../interfaces/userList.interface';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) {}

  listUsuarios() {
    const path = `${this.baseUrl}/user/clientes`;
    return this.http.get<UserList>(path);
  }
}

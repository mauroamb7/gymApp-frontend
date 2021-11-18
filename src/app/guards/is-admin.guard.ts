import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from '../auth/services/auth.service';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate {
  private rols: any[] = [];
  private isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    //Recuperamos 'rols' del token
    let token = localStorage.getItem('token');
    let payload = helper.decodeToken(token!);
    this.rols = payload.rols;

    //Verificamos rol
    for (let i = 0; i < this.rols.length; i++) {
      if (this.rols[i].nombre === 'ADMIN_ROLE') {
        this.isAdmin = true;
        console.log('Guard admin', this.isAdmin);
      } else {
        this.isAdmin = false;
        console.log('Guard admin', this.isAdmin);
      }
    }
    return this.isAdmin;
  }
}

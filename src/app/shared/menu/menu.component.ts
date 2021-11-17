import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from '../../auth/services/auth.service';

const helper = new JwtHelperService();

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isLogged: boolean = false;
  isAdmin: boolean = false;
  rols: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    //Para separar el menu
    this.authService.isLogged.subscribe((value) => {
      //value ? (this.isLogged = true) : (this.isLogged = false);

      if (value) {
        this.isLogged = true;

        //Recuperamos 'rols' del token
        let token = localStorage.getItem('token');
        let payload = helper.decodeToken(token!);
        this.rols = payload.rols;

        //Verificamos rol
        for (let i = 0; i < this.rols.length; i++) {
          if (this.rols[i].nombre === 'ADMIN_ROLE') {
            this.isAdmin = true;
            console.log('is admin', this.isAdmin);
          } else {
            this.isAdmin = false;
            console.log('is admin', this.isAdmin);
          }
        }
      } else {
        this.isLogged = false;
        this.isAdmin = false;
      }
    });
  }

  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
}

import { Component } from '@angular/core';
import { menuItem } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styles: [],
})
export class AuthMenuComponent {
  authMenu: menuItem[] = [
    {
      texto: 'Inicio',
      ruta: './home',
      icon: 'home',
    },
    {
      texto: 'Registrarse',
      ruta: './auth/registro',
      icon: 'app_registration',
    },
    {
      texto: 'Login',
      ruta: './auth/login',
      icon: 'login',
    },
  ];
}

import { Component, OnInit } from '@angular/core';

interface menuItem {
  texto: string;
  ruta: string;
  icon: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  homeMenu: menuItem = {
    texto: 'Inicio',
    ruta: './home',
    icon: 'home',
  };
  authMenu: menuItem[] = [
    {
      texto: 'Registro',
      ruta: './auth/registro',
      icon: 'app_registration',
    },
    {
      texto: 'Login',
      ruta: './auth/login',
      icon: 'login',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

import { Component } from '@angular/core';
import { menuItem } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styles: [],
})
export class AdminMenuComponent {
  adminMenu: menuItem[] = [
    {
      texto: 'Listado de clientes',
      ruta: './app/usuarios',
      icon: 'list',
    },
    {
      texto: 'Valor de cuotas',
      ruta: './app/valor-cuota',
      icon: 'payment',
    },
  ];
}

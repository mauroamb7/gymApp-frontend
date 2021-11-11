import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
export class ListaUsuariosComponent implements OnInit {
  usuario!: Usuario;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    //this.usuario = this.authService.usuario;
  }
}

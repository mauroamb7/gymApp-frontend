import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Usuario } from '../../interfaces/userList.interface';
import { UserServiceService } from '../../services/user.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
export class ListaUsuariosComponent implements OnInit {
  usuarios!: Usuario[];
  total!: number;
  spinner: boolean = true;

  //mat-table
  displayedColumns: string[] = [
    'indice',
    'nombre',
    'apellido',
    'dni',
    'estado',
  ];
  dataSource!: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserServiceService) {}

  ngOnInit(): void {
    this.userService.listUsuarios().subscribe((users) => {
      this.usuarios = users.usuarios;
      this.total = users.total;

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.usuarios);

      if (this.dataSource) {
        this.spinner = false;
        // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

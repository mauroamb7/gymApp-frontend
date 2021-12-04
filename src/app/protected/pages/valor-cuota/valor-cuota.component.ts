import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-valor-cuota',
  templateUrl: './valor-cuota.component.html',
  styleUrls: ['./valor-cuota.component.css'],
})
export class ValorCuotaComponent implements OnInit {
  //mat-table
  displayedColumns: string[] = [
    'indice',
    'nombre',
    'apellido',
    'dni',
    'estado',
  ];
  dataSource!: MatTableDataSource<['elemento1', 'elemento 2']>;

  constructor() {}

  ngOnInit(): void {}

  agregarValor() {}
}

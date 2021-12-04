import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Usuario } from '../../interfaces/userList.interface';
import { UserServiceService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-acciones-usuario',
  templateUrl: './acciones-usuario.component.html',
  styleUrls: ['./acciones-usuario.component.css'],
})
export class AccionesUsuarioComponent implements OnInit {
  ok: boolean = false;
  spinner: boolean = true;
  user!: Usuario;
  id: string = '';

  //formulario datepicker
  range: FormGroup = this.fb.group({
    start: [''],
    end: [''],
  });

  constructor(
    private userService: UserServiceService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    //atrapamos id de la url
    this.route.params.subscribe(({ id }) => {
      this.id = id;
    });
  }

  ngOnInit(): void {
    this.userService.getUserById(this.id).subscribe((resp) => {
      if (resp.ok) {
        this.spinner = false;
        this.user = resp.user;
      }
    });
  }

  openDialogDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        nombre: this.user.nombre,
        apellido: this.user.apellido,
        estado: this.user.estado,
      },
    });

    // TO DO: Optimizar observables
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.userService.deleteUser(this.id).subscribe(({ ok, msg }) => {
          if (ok) {
            let snackBarRef = this.snackBar.open(`${msg}`, 'Aceptar', {
              duration: 5000,
            });
            snackBarRef
              .afterDismissed()
              .subscribe(() => window.location.reload());
          }
        });
      }
    });
  }

  openDialogAlta() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        nombre: this.user.nombre,
        apellido: this.user.apellido,
        estado: this.user.estado,
      },
    });

    // TO DO: Optimizar observables
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.userService.altaUser(this.id, true).subscribe((resp) => {
          if (resp.ok) {
            let snackBarRef = this.snackBar.open(`${resp.msg}`, 'Aceptar', {
              duration: 5000,
            });
            snackBarRef
              .afterDismissed()
              .subscribe(() => window.location.reload());
          }
        });
      }
    });
  }
}

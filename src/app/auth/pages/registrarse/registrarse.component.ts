import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css'],
})
export class RegistrarseComponent implements OnInit {
  hide: boolean = false;
  spinner: boolean = false;

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    dni: [
      '',
      [Validators.required, Validators.min(10000000), Validators.max(99999999)],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  //Comprobar y mostrar campos de errores
  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  registrarse() {
    this.spinner = true;

    if (this.miFormulario.invalid) {
      //Marca todos los campos como touched=true para mostrar los errores defi
      this.miFormulario.markAllAsTouched();
      return;
    }

    const { nombre, apellido, email, password, dni } = this.miFormulario.value;

    this.authService
      .registrar(nombre, apellido, email, password, dni)
      .subscribe((ok) => {
        this.spinner = false;
        if (ok) {
          const valor = this.dialog.open(ErrorDialogComponent, {
            data: {
              msg: 'Usuario registrado con exito!',
              imageSrc:
                'https://www.tututix.com/wp-content/uploads/2015/01/green-check.png',
              exito: true,
            },
          });
          valor.afterClosed().subscribe((value) => {
            if (value) {
              this.router.navigateByUrl('/auth');
            }
          });
        } else {
          this.dialog.open(ErrorDialogComponent, {
            data: {
              msg: ok,
              imageSrc:
                'https://icon-library.com/images/image-error-icon/image-error-icon-9.jpg',
              exito: false,
            },
          });
        }
      });

    //this.router.navigateByUrl('/auth/login');
  }
}

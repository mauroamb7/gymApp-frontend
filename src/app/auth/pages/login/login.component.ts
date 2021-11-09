import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //Ver o esconder contraseña en input
  hide: boolean = false;
  spinner: boolean = false;

  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  login() {
    this.spinner = true;

    //Verificamos campos del formulario
    if (this.miFormulario.invalid) {
      //Marca todos los campos como touched=true para mostrar los errores defi
      this.miFormulario.markAllAsTouched();
      return;
    }

    const { email, password } = this.miFormulario.value;

    this.authService.login(email, password).subscribe((ok) => {
      this.spinner = false;

      if (ok === true) {
        this.router.navigateByUrl('/dashboard');
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

    // this.router.navigateByUrl('/dashboard');
  }
}

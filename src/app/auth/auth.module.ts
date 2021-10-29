import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';

@NgModule({
  declarations: [LoginComponent, RegistrarseComponent],
  imports: [CommonModule, AuthRoutingModule, MaterialModule, FlexLayoutModule],
})
export class AuthModule {}

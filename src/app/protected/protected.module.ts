import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { AccionesUsuarioComponent } from './pages/acciones-usuario/acciones-usuario.component';

@NgModule({
  declarations: [DashboardComponent, ListaUsuariosComponent, AccionesUsuarioComponent],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ],
})
export class ProtectedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { AccionesUsuarioComponent } from './pages/acciones-usuario/acciones-usuario.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ValorCuotaComponent } from './pages/valor-cuota/valor-cuota.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ListaUsuariosComponent,
    AccionesUsuarioComponent,
    ConfirmDialogComponent,
    ValorCuotaComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
})
export class ProtectedModule {}

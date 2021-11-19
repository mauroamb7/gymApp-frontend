import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAdminGuard } from '../guards/is-admin.guard';
import { AccionesUsuarioComponent } from './pages/acciones-usuario/acciones-usuario.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'usuarios',
        component: ListaUsuariosComponent,
        canActivate: [IsAdminGuard],
      },
      {
        path: 'usuario/:id',
        component: AccionesUsuarioComponent,
        canActivate: [IsAdminGuard],
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}

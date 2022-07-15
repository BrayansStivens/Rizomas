import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './core/index/components/inicio/inicio.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NotFoundComponent } from './core/index/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/administrador/administrador.module').then(
        (m) => m.AdministradorModule
      ),
    data: {
      role: 'admin',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'docentes',
    loadChildren: () =>
      import('./features/docentes/docentes.module').then(
        (m) => m.DocentesModule
      ),
    data: {
      role: 'docente',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'mapas',
    loadChildren: () =>
      import('./features/mapas/mapas.module').then((m) => m.MapasModule),
    data: {
      role: 'estudiante',
    },
    canActivate: [AuthGuard],
  },
<<<<<<< Updated upstream
=======
  {
    path: 'invitados',
    loadChildren: () =>
      import('./features/mapas/mapas.module').then((m) => m.MapasModule),
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

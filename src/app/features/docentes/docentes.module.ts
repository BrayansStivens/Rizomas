import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocentesRoutingModule } from './docentes-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';

@NgModule({
  declarations: [MenuComponent, EstudiantesComponent],
  imports: [CommonModule, DocentesRoutingModule, SharedModule],
})
export class DocentesModule {}

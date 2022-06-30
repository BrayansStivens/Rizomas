import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';
import { ArbolComponent } from './components/arbol/arbol.component';
import { MenuComponent } from './components/menu/menu.component';
import { MujeresComponent } from './components/mujeres/mujeres.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ArbolComponent, MenuComponent, MujeresComponent],
  imports: [CommonModule, MapasRoutingModule, SharedModule],
})
export class MapasModule {}

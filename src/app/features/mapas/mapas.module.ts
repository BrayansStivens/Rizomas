import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';
import { ArbolComponent } from './components/arbol/arbol.component';
import { MenuComponent } from './components/menu/menu.component';
import { MujeresComponent } from './components/mujeres/mujeres.component';
import { SharedModule } from '../../shared/shared.module';
import { AudioFondoComponent } from './components/audio-fondo/audio-fondo.component';

@NgModule({
  declarations: [ArbolComponent, MenuComponent, MujeresComponent, AudioFondoComponent],
  imports: [CommonModule, MapasRoutingModule, SharedModule],
})
export class MapasModule {}

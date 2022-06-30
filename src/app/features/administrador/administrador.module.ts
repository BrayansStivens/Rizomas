import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { SharedModule } from '../../shared/shared.module';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { GruposComponent } from './components/grupos/grupos.component';

@NgModule({
  declarations: [MenuComponent, UsuariosComponent, ContenidoComponent, GruposComponent],
  imports: [CommonModule, AdministradorRoutingModule, SharedModule],
})
export class AdministradorModule {}

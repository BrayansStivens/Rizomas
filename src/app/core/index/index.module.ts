import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './components/inicio/inicio.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginModalComponent } from 'src/app/core/index/modals/login-modal/login-modal.component';
import { LogoComponent } from './components/logo/logo.component';
import { PlantaComponent } from './components/planta/planta.component';
import { AudioModalComponent } from './modals/audio-modal/audio-modal.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    InicioComponent,
    LoginModalComponent,
    LogoComponent,
    PlantaComponent,
    AudioModalComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class IndexModule {}

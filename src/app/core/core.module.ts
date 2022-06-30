import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexModule } from './index/index.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, IndexModule],
  exports: [],
})
export class CoreModule {}

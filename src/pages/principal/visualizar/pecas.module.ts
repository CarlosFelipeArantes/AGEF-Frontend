import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PecasPage } from './pecas';

@NgModule({
  declarations: [
    PecasPage,
  ],
  imports: [
    IonicPageModule.forChild(PecasPage),
  ],
})
export class PecasPageModule {}

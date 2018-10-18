import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { showPecasPage } from './pecas';

@NgModule({
  declarations: [
    showPecasPage,
  ],
  imports: [
    IonicPageModule.forChild(showPecasPage),
  ],
})
export class showPecasPageModule {}

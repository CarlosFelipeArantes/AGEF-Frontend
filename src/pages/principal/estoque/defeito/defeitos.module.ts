import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { manageDefeitosPage } from './defeitos';

@NgModule({
  declarations: [
    manageDefeitosPage,
  ],
  imports: [
    IonicPageModule.forChild(manageDefeitosPage),
  ],
})
export class manageDefeitosPageModule {}

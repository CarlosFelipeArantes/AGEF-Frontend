import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { showEstoquePage } from './visualizar';

@NgModule({
  declarations: [
    showEstoquePage,
  ],
  imports: [
    IonicPageModule.forChild(showEstoquePage),
  ],
})
export class showEstoquePageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEstoquePage } from './adicionar';

@NgModule({
  declarations: [
    AddEstoquePage,
  ],
  imports: [
    IonicPageModule.forChild(AddEstoquePage),
  ],
})
export class AddEstoquePageModule {}

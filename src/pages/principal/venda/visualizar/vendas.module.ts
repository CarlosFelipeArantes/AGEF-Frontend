import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { showVendasPage } from './vendas';

@NgModule({
  declarations: [
    showVendasPage,
  ],
  imports: [
    IonicPageModule.forChild(showVendasPage),
  ],
})
export class showVendasPageModule {}

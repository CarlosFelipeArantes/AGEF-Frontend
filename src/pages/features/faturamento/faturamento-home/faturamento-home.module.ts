import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaturamentoHomePage } from './faturamento-home';

@NgModule({
  declarations: [
    FaturamentoHomePage,
  ],
  imports: [
    IonicPageModule.forChild(FaturamentoHomePage),
  ],
})
export class FaturamentoHomePageModule {}

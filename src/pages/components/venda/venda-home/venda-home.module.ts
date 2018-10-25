import {IonicPageModule} from 'ionic-angular';
import {NgModule} from '@angular/core';
import {VendaHomePage} from './venda-home';

@NgModule({
    declarations: [
        VendaHomePage
    ],
    imports: [
        IonicPageModule.forChild(VendaHomePage)
    ],
})
export class VendaHomePageModule {
}

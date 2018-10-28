import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {VendaInsertPage} from './venda-insert';

@NgModule({
    declarations: [
        VendaInsertPage,
    ],
    imports: [
        IonicPageModule.forChild(VendaInsertPage),
    ],
})
export class VendaInsertPageModule {
}

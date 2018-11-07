import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {VendaInsertPage} from './venda-insert';
import {BrMaskerModule} from "brmasker-ionic-3";

@NgModule({
    declarations: [
        VendaInsertPage,
    ],
    imports: [
        BrMaskerModule,
        IonicPageModule.forChild(VendaInsertPage),
    ],
})
export class VendaInsertPageModule {
}

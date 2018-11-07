import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {VendaInsertPage} from './venda-insert';
import {VendaService} from "../../../../services/domain/venda.service";
import {BrMaskerModule} from "brmasker-ionic-3";

@NgModule({
    declarations: [
        VendaInsertPage,
    ],
    imports: [
        BrMaskerModule,
        IonicPageModule.forChild(VendaInsertPage),
    ],
    providers: [
        VendaService
    ]
})
export class VendaInsertPageModule {
}

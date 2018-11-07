import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {VendaInsertPage} from './venda-insert';
import {VendaService} from "../../../../services/domain/venda.service";
import {BrMaskerModule} from "brmasker-ionic-3";
import {PecaFeiraService} from "../../../../services/domain/peca-feira.service";

@NgModule({
    declarations: [
        VendaInsertPage,
    ],
    imports: [
        BrMaskerModule,
        IonicPageModule.forChild(VendaInsertPage),
    ],
    providers: [
        PecaFeiraService,
        VendaService
    ]
})
export class VendaInsertPageModule {
}

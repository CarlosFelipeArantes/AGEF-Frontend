import {IonicPageModule} from 'ionic-angular';
import {NgModule} from '@angular/core';
import {VendaCompletaPage} from './venda-completa';
import {VendaService} from "../../../../services/domain/venda.service";
import {PecaFeiraService} from "../../../../services/domain/peca-feira.service";

@NgModule({
    declarations: [
        VendaCompletaPage
    ],
    imports: [
        IonicPageModule.forChild(VendaCompletaPage),
    ],
    providers: [
        PecaFeiraService,
        VendaService
    ]
})
export class VendaCompletaPageModule {
}

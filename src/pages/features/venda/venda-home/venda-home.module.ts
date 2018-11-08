import {IonicPageModule} from 'ionic-angular';
import {NgModule} from '@angular/core';
import {VendaHomePage} from './venda-home';
import {VendaService} from "../../../../services/domain/venda.service";
import {PecaFeiraService} from "../../../../services/domain/peca-feira.service";

@NgModule({
    declarations: [
        VendaHomePage
    ],
    imports: [
        IonicPageModule.forChild(VendaHomePage),
    ],
    providers: [
        PecaFeiraService,
        VendaService
    ]
})
export class VendaHomePageModule {
}

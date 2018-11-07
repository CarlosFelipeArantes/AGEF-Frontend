import {IonicPageModule} from 'ionic-angular';
import {NgModule} from '@angular/core';
import {VendaHomePage} from './venda-home';
import {VendaService} from "../../../../services/domain/venda.service";

@NgModule({
    declarations: [
        VendaHomePage
    ],
    imports: [
        IonicPageModule.forChild(VendaHomePage),
    ],
    providers: [
        VendaService
    ]
})
export class VendaHomePageModule {
}

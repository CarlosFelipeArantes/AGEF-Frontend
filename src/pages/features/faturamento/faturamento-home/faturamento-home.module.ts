import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {FaturamentoHomePage} from './faturamento-home';
import {VendaService} from "../../../../services/domain/venda.service";

@NgModule({
    declarations: [
        FaturamentoHomePage,
    ],
    imports: [
        IonicPageModule.forChild(FaturamentoHomePage),
    ],
    providers: [
        VendaService
    ]
})
export class FaturamentoHomePageModule {
}

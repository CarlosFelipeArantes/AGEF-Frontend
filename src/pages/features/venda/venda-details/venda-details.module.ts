import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {VendaDetailsPage} from './venda-details';
import {VendaService} from "../../../../services/domain/venda.service";

@NgModule({
    declarations: [
        VendaDetailsPage
    ],
    imports: [
        IonicPageModule.forChild(VendaDetailsPage)
    ],
    providers: [
        VendaService
    ]
})
export class VendaDetailsPageModule {
}

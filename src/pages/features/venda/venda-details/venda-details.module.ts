import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {VendaDetailsPage} from './venda-details';

@NgModule({
    declarations: [
        VendaDetailsPage
    ],
    imports: [
        IonicPageModule.forChild(VendaDetailsPage),
    ],
})
export class VendaDetailsPageModule {
}

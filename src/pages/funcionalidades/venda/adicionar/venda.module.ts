import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {vendaPage} from './venda';

@NgModule({
    declarations: [
        vendaPage,
    ],
    imports: [
        IonicPageModule.forChild(vendaPage),
    ],
})
export class showVendasPageModule {
}

import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {FaturamentoDetailsPage} from './faturamento-details';

@NgModule({
    declarations: [
        FaturamentoDetailsPage,
    ],
    imports: [
        IonicPageModule.forChild(FaturamentoDetailsPage),
    ],
})
export class FaturamentoDetailsPageModule {
}

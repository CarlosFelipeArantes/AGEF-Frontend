import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {FaturamentoPage} from './faturamento';

@NgModule({
    declarations: [
        FaturamentoPage,
    ],
    imports: [
        IonicPageModule.forChild(FaturamentoPage),
    ],
})
export class FaturamentoPageModule {
}

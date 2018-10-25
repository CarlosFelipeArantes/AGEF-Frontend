import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EstoquePage} from './visualizar';

@NgModule({
    declarations: [
        EstoquePage,
    ],
    imports: [
        IonicPageModule.forChild(EstoquePage),
    ],
})
export class EstoquePageModule {
}

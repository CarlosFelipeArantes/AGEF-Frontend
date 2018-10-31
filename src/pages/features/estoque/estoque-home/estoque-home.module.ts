import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EstoqueHomePage} from './estoque-home';

@NgModule({
    declarations: [
        EstoqueHomePage,
    ],
    imports: [
        IonicPageModule.forChild(EstoqueHomePage),
    ],
})
export class EstoqueHomePageModule {
}

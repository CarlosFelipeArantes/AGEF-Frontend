import {IonicPageModule} from 'ionic-angular';
import {NgModule} from '@angular/core';
import {VendaHomePage} from './venda-home';
import {ExpandableComponent} from "../../../../components/expandable/expandable";

@NgModule({
    declarations: [
        VendaHomePage
    ],
    imports: [
        IonicPageModule.forChild(VendaHomePage)
    ],
})
export class VendaHomePageModule {
}

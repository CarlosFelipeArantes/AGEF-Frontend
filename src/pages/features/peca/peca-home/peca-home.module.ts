import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PecaHomePage} from './peca-home';
import {PecaFeiraService} from "../../../../services/domain/peca-feira.service";

@NgModule({
    declarations: [
        PecaHomePage,
    ],
    imports: [
        IonicPageModule.forChild(PecaHomePage),
    ],
    providers: [
        PecaFeiraService
    ]
})
export class PecaHomePageModule {
}

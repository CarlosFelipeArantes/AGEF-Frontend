import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DefeitoInsertPage} from './defeito-insert';
import {DefeitoService} from "../../../../services/domain/defeito.service";
import {PecaFeiraService} from "../../../../services/domain/peca-feira.service";

@NgModule({
    declarations: [
        DefeitoInsertPage,
    ],
    imports: [
        IonicPageModule.forChild(DefeitoInsertPage),
    ],
    providers: [
        DefeitoService,
        PecaFeiraService
    ]
})
export class DefeitoInsertPageModule {
}

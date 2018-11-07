import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DefeitoInsertPage} from './defeito-insert';
import {DefeitoService} from "../../../../services/domain/defeito.service";

@NgModule({
    declarations: [
        DefeitoInsertPage,
    ],
    imports: [
        IonicPageModule.forChild(DefeitoInsertPage),
    ],
    providers: [
        DefeitoService
    ]
})
export class DefeitoInsertPageModule {
}

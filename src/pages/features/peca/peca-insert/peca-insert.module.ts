import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PecaInsertPage} from './peca-insert';
import {PecaFeiraService} from "../../../../services/domain/peca-feira.service";
import {ModeloService} from "../../../../services/domain/modelo.service";
import {BrMaskerModule} from "brmasker-ionic-3";

@NgModule({
    declarations: [
        PecaInsertPage
    ],
    imports: [
        BrMaskerModule,
        IonicPageModule.forChild(PecaInsertPage)
    ],
    providers: [
        ModeloService,
        PecaFeiraService
    ]
})
export class PecaInsertPageModule {
}

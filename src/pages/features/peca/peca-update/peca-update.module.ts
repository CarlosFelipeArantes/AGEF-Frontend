import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PecaUpdatePage} from './peca-update';
import {PecaFeiraService} from "../../../../services/domain/peca-feira.service";
import {BrMaskerModule} from "brmasker-ionic-3";

@NgModule({
    declarations: [
        PecaUpdatePage
    ],
    imports: [
        BrMaskerModule,
        IonicPageModule.forChild(PecaUpdatePage)
    ],
    providers: [
        PecaFeiraService
    ]
})
export class PecaUpdatePageModule {
}

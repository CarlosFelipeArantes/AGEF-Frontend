import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DefeitoDetailsPage} from './defeito-details';
import {DefeitoService} from "../../../../services/domain/defeito.service";

@NgModule({
    declarations: [
        DefeitoDetailsPage,
    ],
    imports: [
        IonicPageModule.forChild(DefeitoDetailsPage),
    ],
    providers: [
        DefeitoService
    ]
})
export class DefeitoDetailsPageModule {
}

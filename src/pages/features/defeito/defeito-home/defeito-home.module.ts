import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DefeitoHomePage} from './defeito-home';
import {DefeitoService} from "../../../../services/domain/defeito.service";

@NgModule({
    declarations: [
        DefeitoHomePage,
    ],
    imports: [
        IonicPageModule.forChild(DefeitoHomePage),
    ],
    providers: [
        DefeitoService
    ]
})
export class DefeitoHomePageModule {
}

import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ModeloHomePage} from './modelo-home';
import {ModeloService} from "../../../../services/domain/modelo.service";

@NgModule({
    declarations: [
        ModeloHomePage,
    ],
    imports: [
        IonicPageModule.forChild(ModeloHomePage),
    ],
    providers: [
        ModeloService
    ]
})
export class ModeloHomePageModule {
}

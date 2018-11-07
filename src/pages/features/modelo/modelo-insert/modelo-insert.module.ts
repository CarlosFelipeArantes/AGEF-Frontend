import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ModeloInsertPage} from './modelo-insert';
import {ModeloService} from "../../../../services/domain/modelo.service";

@NgModule({
    declarations: [
        ModeloInsertPage,
    ],
    imports: [
        IonicPageModule.forChild(ModeloInsertPage),
    ],
    providers: [
        ModeloService
    ]
})
export class ModeloInsertPageModule {
}

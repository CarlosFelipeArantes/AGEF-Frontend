import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ModeloInsertPage} from './modelo-insert';

@NgModule({
    declarations: [
        ModeloInsertPage,
    ],
    imports: [
        IonicPageModule.forChild(ModeloInsertPage),
    ],
})
export class ModeloInsertPageModule {
}

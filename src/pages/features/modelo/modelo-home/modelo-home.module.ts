import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ModeloHomePage} from './modelo-home';

@NgModule({
    declarations: [
        ModeloHomePage,
    ],
    imports: [
        IonicPageModule.forChild(ModeloHomePage),
    ],
})
export class ModeloHomePageModule {
}

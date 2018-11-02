import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DefeitoHomePage} from './defeito-home';

@NgModule({
    declarations: [
        DefeitoHomePage,
    ],
    imports: [
        IonicPageModule.forChild(DefeitoHomePage),
    ],
})
export class DefeitoHomePageModule {
}

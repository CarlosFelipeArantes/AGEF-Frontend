import {IonicPageModule} from 'ionic-angular/module';
import {NgModule} from '@angular/core';
import {TabPage} from './tab';

@NgModule({
    declarations: [TabPage],
    imports: [IonicPageModule.forChild(TabPage)]
})
export class TabModule {
}
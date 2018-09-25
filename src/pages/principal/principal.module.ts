import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core';
import { PrincipalPage } from './principal';
@NgModule({
    declarations: [PrincipalPage],
    imports: [IonicPageModule.forChild(PrincipalPage)]
})
export class PrincipalModule {
}
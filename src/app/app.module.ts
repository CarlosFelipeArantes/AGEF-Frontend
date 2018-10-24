import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HttpClientModule} from '@angular/common/http';
import {MyApp} from './app.component';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ModeloService} from '../services/domain/modelo.service';
import {pecaFeiraService} from '../services/domain/pecaFeira.service';
import {vendaService} from '../services/domain/venda.service';
import {defeitoService} from '../services/domain/defeito.service';
import {Network} from '@ionic-native/network';
import {NetworkInjector} from '../injectables/network';
import {DialogoProvider} from "../injectables/dialogo";


@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],

    //TODO-Carlos renomear os providers de acordo com as boas práticas.
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        ModeloService,
        pecaFeiraService,
        vendaService,
        defeitoService,
        Network,
        NetworkInjector,
        DialogoProvider
    ]
})
export class AppModule {
}

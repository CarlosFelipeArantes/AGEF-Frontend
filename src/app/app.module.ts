import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HttpClientModule} from '@angular/common/http';
import {MyApp} from './app.component';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Network} from '@ionic-native/network';
import {NetworkInjector} from '../injectables/network';
import {DialogoProvider} from "../injectables/dialogo";
import {LoadingProvider} from "../injectables/loading";
import {DatePipe} from "@angular/common";
import {UtilsService} from "../services/utils/utils.service";
import {BrMaskerIonicServices3} from "brmasker-ionic-3";
import {SocketIoModule, SocketIoConfig} from 'ng-socket-io';
import {SOCKET_IO_CONFIG} from '../config/socket.io.config'

@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        SocketIoModule.forRoot(SOCKET_IO_CONFIG)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],

    //TODO-Carlos renomear os providers de acordo com as boas práticas.
    providers: [
        UtilsService,
        BrMaskerIonicServices3,
        DatePipe,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        Network,
        NetworkInjector,
        DialogoProvider,
        LoadingProvider
    ]
})
export class AppModule {
}
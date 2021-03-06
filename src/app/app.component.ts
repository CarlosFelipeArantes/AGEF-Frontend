import { Component, ViewChild } from '@angular/core';
import { AlertController, Events, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NetworkInjector } from '../injectables/network';
import { Network } from '@ionic-native/network';
import { API_CONFIG } from '../config/api.config';
import { Socket } from 'ng-socket-io';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: string = 'HomePage';

    pages: Array<{ title: string, component: string }>;

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public network: Network,
        public networkInjector: NetworkInjector,
        private socket: Socket,
        public events: Events,
        private alertCtrl: AlertController
    ) {
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: 'HomePage' }
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.socket.connect();
            this.socket.emit('entrei', API_CONFIG.baseUrl);
            this.socket.disconnect();
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            this.networkInjector.initializeNetworkEvents();

            // Offline event
            this.events.subscribe('network:offline', () => {
                this.alertNoInternet();
            });

            // Online event
            this.events.subscribe('network:online', () => {
                this.alertInternet();
            });
        });
    }

    alertNoInternet() {
        let alert = this.alertCtrl.create({
            title: 'Internet',
            subTitle: 'Internet não disponível.',
            buttons: ['OK']
        });
        alert.present();
    }

    alertInternet() {
        let alert = this.alertCtrl.create({
            title: 'Internet',
            subTitle: 'Internet disponível!',
            buttons: ['OK']
        });
        alert.present();
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}

import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {MenuController} from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, public menu: MenuController) {

    }

    // noinspection JSUnusedGlobalSymbols
    ionViewWillEnter() {
        this.menu.swipeEnable(false);
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidLeave() {
        this.menu.swipeEnable(true);
    }


    login() {

        this.navCtrl.push("TabsPage");

    }
}

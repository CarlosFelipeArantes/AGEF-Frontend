import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { API_CONFIG } from '../../config/api.config';
import { SERVER_LIST } from '../../config/server.config';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    servidorSelecionado: string;
    servidores: any = SERVER_LIST;

    constructor(public navCtrl: NavController, public menu: MenuController) {
    }

    ionViewWillEnter() {
        this.menu.swipeEnable(false);
        this.servidorSelecionado = this.recuperarServidorPadrao(this.servidores);
    }

    ionViewDidLeave() {
        this.menu.swipeEnable(true);
    }

    login() {
        API_CONFIG.baseUrl = this.servidorSelecionado;
        this.navCtrl.push("TabsPage");
    }

    public recuperarServidorPadrao(servidores: any[]): string {
        let chavesServidores = this.recuperarChavesServidores(servidores);
        let chaveServidorPadrao: string = chavesServidores[0];

        return servidores[chaveServidorPadrao];
    }

    public recuperarChavesServidores(servidores: any[]): any[] {
        return Object.keys(servidores);
    }
}

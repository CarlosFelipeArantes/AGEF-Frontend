import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {MenuController} from 'ionic-angular/components/app/menu-controller';
import {Network} from '@ionic-native/network';
import {VendaService} from '../../../../services/domain/venda.service';


@IonicPage()
@Component({
    selector: 'page-principal',
    templateUrl: 'principal.html'
})
export class PrincipalPage {

    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
        private network: Network,
        private alertCtrl: AlertController,
        private vendaService: VendaService
    ) {

    }

    // noinspection JSUnusedGlobalSymbols
    ionViewWillEnter() {
        this.menu.swipeEnable(false);
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidLeave() {
        this.menu.swipeEnable(true);
    }

    modelos() {
        this.navCtrl.push("ModelosPage");
    }

    visualizarEstoque() {
        this.navCtrl.push("showEstoquePage");
    }

    visualizarVendas() {
        this.navCtrl.push("showVendasPage");
    }

    realizarVenda() {
        this.navCtrl.push("vendaPage");
    }

    faturamento() {
        let alert = this.alertCtrl.create({
            title: 'Faturamento:',
            message: "Selecione o período desejado em formato DD-MM-ANO:",
            inputs: [
                {
                    name: 'inicio',
                    placeholder: 'Início: DD-MM-ANO'
                },
                {
                    name: 'fim',
                    placeholder: 'Fim: DD-MM-ANO'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Confirmar',
                    handler: data => {
                        const inicio: String = data.inicio;
                        const fim: String = data.fim;
                        this.vendaService.findByDateBetween(inicio, fim)
                            .subscribe(response => {
                                    let alert = this.alertCtrl.create({
                                        title: 'Faturamento',
                                        subTitle: 'O faturamento do período selecionado foi de: R$' + response,
                                        buttons: ['OK']
                                    });
                                    alert.present();
                                },
                                error => {
                                    console.log(error);
                                });
                    }
                }
            ]
        });
        alert.present();
    }

    defeito() {
        this.navCtrl.push("manageDefeitosPage");
    }
}

import {AlertController, Events, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Component} from '@angular/core';
import {vendaService} from '../../../../services/domain/venda.service';
import {PecaFeiraDTO} from '../../../../models/pecaFeiraDTO';
import {VendaDTO} from '../../../../models/venda.dto';

@IonicPage()
@Component({
    selector: 'vendas-visualizar',
    templateUrl: 'vendas.html',
})
export class showVendasPage {

    vendas: VendaDTO[];
    pecaFeira: PecaFeiraDTO;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public vendaService: vendaService,
        public events: Events,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController
    ) {

        this.events.subscribe('updateScreen', () => {
            this.vendaService.findAll()
                .subscribe(response => {
                        this.vendas = response;
                    },
                    error => {
                        console.log(error);
                    });
        });
    }

    ionViewDidEnter() {
        this.vendaService.findAll()
            .subscribe(response => {
                    this.vendas = response;
                },
                error => {
                    console.log(error);
                });
    }

    remove(venda: VendaDTO) {
        let title = 'Confirmar Remoção';
        let message = 'Você realmente quer apagar esse registro de venda?';
        let alert = this.presentConfirm(title, message);

        alert.present();

        alert.onDidDismiss((isConfirmed) => {
            if (isConfirmed) {
                this.vendaService.remove(venda).subscribe(response => {
                        this.events.publish('updateScreen');
                        this.presentToast("Venda apagada com sucesso.");
                    },
                    error => {
                        // TODO tratar possíveis erros
                    })
            }
        });
    }

    // TODO criar helper com este método
    presentToast(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: "OK"
        });

        toast.present();
    }

    // TODO criar helper com este método
    presentConfirm(title: string, message: string) {
        let alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        alert.dismiss(false);
                        return false;
                    }
                },
                {
                    text: 'Confirmar',
                    handler: () => {
                        alert.dismiss(true);
                        return false;
                    }
                }
            ]
        });

        return alert;
    }

}
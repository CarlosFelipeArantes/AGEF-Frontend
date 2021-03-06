import {AlertController, ToastController} from 'ionic-angular';
import {Injectable} from "@angular/core";

@Injectable()
export class DialogoProvider {

    private alertCtrl: any;
    private toastCtrl: any;

    constructor(alertCtrl: AlertController, toastCtrl: ToastController) {
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
    }

    exibirToast(mensagem: string) {
        let toast = this.toastCtrl.create({
            message: mensagem,
            duration: 3000,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: "OK"
        });

        toast.present();
    }

    exibirDialogoConfirmacao(mensagem: string, titulo: string) {
        let alert = this.alertCtrl.create({
            title: titulo,
            message: mensagem,
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

    exibirDialogoInformacao(mensagem: string, titulo: string) {
        let alert = this.alertCtrl.create({
            title: titulo,
            message: mensagem,
            buttons: [
                {
                    text: 'OK',
                    role: 'cancel'
                }
            ]
        });

        alert.present();
    }
}
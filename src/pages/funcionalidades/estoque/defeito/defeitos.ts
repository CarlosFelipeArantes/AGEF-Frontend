import {Component} from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {defeitoService} from '../../../../services/domain/defeito.service';
import {DefeitoDTO} from '../../../../models/defeito.dto';


@IonicPage()
@Component({
    selector: 'page-defeitos',
    templateUrl: 'defeitos.html',
})
export class manageDefeitosPage {

    items: DefeitoDTO[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        public defeitoService: defeitoService,
        public events: Events
    ) {

        this.events.subscribe('updateScreen', () => {
            this.defeitoService.findAll()
                .subscribe(response => {
                        this.items = response;
                    },
                    error => {
                        console.log(error);
                    });
        });
    }

    ionViewDidEnter() {
        this.defeitoService.findAll()
            .subscribe(response => {
                    this.items = response;
                },
                error => {
                    console.log(error);
                });
    }

    remove(defeito: DefeitoDTO) {
        this.defeitoService.remove(defeito)
            .subscribe(response => {
                    this.events.publish('updateScreen');
                    let alert = this.alertCtrl.create({
                        title: 'Sucesso',
                        subTitle: 'Registro de defeito removido com sucesso!',
                        buttons: ['Continuar']
                    });
                    alert.present();
                },
                error => {
                    if (error.status == '400') {
                        let alert = this.alertCtrl.create({
                            title: 'Erro',
                            subTitle: 'Não foi possível remover o defeito.',
                            buttons: ['Continuar']
                        });
                        alert.present();
                    }
                });
    }

    edit(defeito: DefeitoDTO) {
        let alert = this.alertCtrl.create({
            title: 'Editar:',
            message: "Aqui você pode editar o seu modelo: " + "",
            inputs: [
                {
                    name: 'preco',
                    placeholder: ""
                },
                {
                    name: 'quantidade',
                    placeholder: "" + ""
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Confirmar',
                    handler: data => {
                        if (data.preco != '')
                        //pecaFeira.preco = data.preco;
                            if (data.quantidade != '')
                            //pecaFeira.quantidade = data.quantidade;

                                this.defeitoService.update(defeito).subscribe(response => {
                                        this.events.publish('updateScreen');
                                        let alert = this.alertCtrl.create({
                                            title: 'Sucesso',
                                            subTitle: 'Defeito removido com sucesso!',
                                            buttons: ['Continuar']
                                        });
                                        alert.present();
                                    },
                                    error => {
                                        if (error.status == '400') {
                                            let alert = this.alertCtrl.create({
                                                title: 'Erro',
                                                subTitle: 'Não foi possível editar o defeito.',
                                                buttons: ['Continuar']
                                            });
                                            alert.present();
                                        }
                                    });
                    }
                }
            ]
        });
        alert.present();
    }

    registrar() {
        this.navCtrl.push("showPecasPage");
    }

}
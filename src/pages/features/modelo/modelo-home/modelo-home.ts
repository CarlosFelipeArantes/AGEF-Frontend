import {Component} from '@angular/core';
import {
    AlertController,
    Events,
    IonicPage,
    LoadingController,
    NavController,
    NavParams,
    ToastController
} from 'ionic-angular';
import {ModeloService} from '../../../../services/domain/modelo.service';
import {ModeloDTO} from '../../../../models/modelo.dto';

@IonicPage()
@Component({
    selector: 'page-modelo-home',
    templateUrl: 'modelo-home.html',
})
export class ModeloHomePage {

    items: ModeloDTO[];
    modelo: ModeloDTO;
    loading = this.loadingCtrl.create({
        content: 'Por favor aguarde...'
    });

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modeloService: ModeloService,
        public events: Events,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController
    ) {
        this.eventos();
    }

    eventos() {
        this.events.subscribe('updateScreen', () => {
            this.modeloService.findAll()
                .subscribe(response => {
                        this.items = response;
                    },
                    error => {
                        console.log(error);
                    });
        });
    }

    presentLoading(apear: boolean) {
        if (apear) {
            this.loading.present();
        } else {
            this.loading.dismiss();
        }
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidLoad() {
        this.presentLoading(true);
        this.modeloService.findAll()
            .subscribe(response => {
                    this.items = response;
                    this.presentLoading(false);
                },
                error => {
                    //
                });
    }

    delete(modelo: ModeloDTO) {
        this.modeloService.remove(modelo)
            .subscribe(response => {
                    this.events.publish('updateScreen');
                    let alert = this.alertCtrl.create({
                        title: 'Sucesso',
                        subTitle: 'Modelo removido com sucesso!',
                        buttons: ['Continuar']
                    });
                    alert.present();
                },
                error => {
                    this.alertaRemoverErro(modelo);
                });
    }

    alertaRemoverErro(modelo: ModeloDTO) {
        let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: 'Não é possível remover o modelo "' + modelo.nome + '", pois está em estoque. Remova primeiro do estoque.',
            buttons: ['OK']
        });
        alert.present();
    }

    edit(modelo: ModeloDTO) {
        let alert = this.alertCtrl.create({
            title: 'Editar:',
            message: "Aqui você pode editar o seu modelo",
            inputs: [
                {
                    name: 'nome',
                    placeholder: modelo.nome
                },
                {
                    name: 'tamanho',
                    placeholder: modelo.tamanho
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
                        if (data.nome != '')
                            modelo.nome = data.nome;
                        if (data.tamanho != '')
                            modelo.tamanho = data.tamanho;
                        this.updateModelo(modelo);
                    }
                }
            ]
        });
        alert.present();
    }

    updateModelo(modelo: ModeloDTO) {
        this.modeloService.update(modelo).subscribe(response => {
                this.events.publish('updateScreen');
                let alert = this.alertCtrl.create({
                    title: 'Sucesso',
                    subTitle: 'Modelo editado com sucesso!',
                    buttons: ['Continuar']
                });
                alert.present();
            },
            error => {
                let alert = this.alertCtrl.create({
                    title: 'Erro',
                    subTitle: 'Não foi possível editar o modelo.',
                    buttons: ['Continuar']
                });
                alert.present();
            });
    }

    addPrompt() {

        this.modelo = {
            id: '',
            nome: '',
            tamanho: ''
        };
        let alert = this.alertCtrl.create({
            title: 'Cadastrar',
            message: "Aqui você pode adicionar o seu modelo",
            inputs: [
                {
                    name: 'nome',
                    placeholder: 'Nome'
                },
                {
                    name: 'tamanho',
                    placeholder: 'Tamanho'
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
                        this.modelo.nome = data.nome;
                        this.modelo.tamanho = data.tamanho;
                        this.addModelo(this.modelo);
                    }
                }
            ]
        });
        alert.present();
    }

    addModelo(modelo: ModeloDTO) {
        this.modeloService.save(modelo)
            .subscribe(response => {
                    this.events.publish('updateScreen');
                    let alert = this.alertCtrl.create({
                        title: 'Sucesso',
                        subTitle: 'Modelo inserido com sucesso!',
                        buttons: ['Continuar']
                    });
                    alert.present();
                },
                error => {
                    //this.alertaRemoverErro(modelo);
                });
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Não é possível remover uma peça que está em estoque.\n Remova primeiro do estoque.',
            showCloseButton: true,
            position: 'middle',
            cssClass: "toast",
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }

}
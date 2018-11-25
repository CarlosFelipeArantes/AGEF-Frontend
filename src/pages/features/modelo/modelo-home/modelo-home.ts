import {Component} from '@angular/core';
import {
    AlertController,
    Events,
    IonicPage,
    LoadingController,
    NavController,
    NavParams,
    ToastController,
    ModalController
} from 'ionic-angular';
import {DialogoProvider} from "../../../../injectables/dialogo";
import {ModeloService} from '../../../../services/domain/modelo.service';
import {ModeloDTO} from '../../../../models/modelo.dto';
import {LoadingProvider} from "../../../../injectables/loading";

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
        public dialogo: DialogoProvider,
        public navCtrl: NavController,
        public loaderProvider: LoadingProvider,
        public navParams: NavParams,
        public modeloService: ModeloService,
        public events: Events,
        public modalCtrl: ModalController,
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

    ionViewDidLoad() {
        this.presentLoading(true);
    }

    
    ionViewWillEnter() {
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
        let mensagem: string = 'Você realmente quer apagar esse registro de defeito?';
        let titulo: string = 'Confirmar Remoção';
        let alert = this.dialogo.exibirDialogoConfirmacao(mensagem, titulo);

        alert.present();

        alert.onDidDismiss((confirmado) => {
            if (confirmado) {
                this.loading = this.loaderProvider.exibirLoadingPadrao("Apagando o modelo.");
                this.presentLoading(true);

                this.modeloService.remove(modelo)
                    .subscribe(() => {
                            this.events.publish('updateScreen');
                            this.presentLoading(false);
                            this.dialogo.exibirToast("Modelo apagado com sucesso.");
                        },
                        error => {
                            this.presentLoading(false);
                            this.dialogo.exibirToast("Não foi possível remover. O modelo está associado em estoque.");
                            console.log(error);
                        })
            }
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

    public insert(): void {
        let modalModelo = this.modalCtrl.create('ModeloInsertPage');

        modalModelo.present();

        modalModelo.onDidDismiss(vendido => {
            this.events.publish('updateScreen');
        });
    }

}
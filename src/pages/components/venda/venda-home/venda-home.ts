import {Events, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {DialogoProvider} from "../../../../injectables/dialogo";
import {LoaderProvider} from "../../../../injectables/loader";
import {VendaDTO} from '../../../../models/venda.dto';
import {VendaService} from '../../../../services/domain/venda.service';

@IonicPage()
@Component({
    selector: 'page-venda-home',
    templateUrl: 'venda-home.html'
})
export class VendaHomePage {

    vendas: VendaDTO[];

    constructor(
        public dialogo: DialogoProvider,
        public events: Events,
        public loader: LoaderProvider,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public vendaService: VendaService) {
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidLoad() {
        this.loadVendas();
    }

    delete(venda: VendaDTO) {
        let mensagem = 'Você realmente quer apagar esse registro de venda?';
        let titulo = 'Confirmar Remoção';
        let alert = this.dialogo.exibirDialogoConfirmacao(mensagem, titulo);

        alert.present();

        alert.onDidDismiss((confirmado) => {
            if (confirmado) {
                let loader = this.loader.exibirLoaderPadrao("Apagando a venda.");
                loader.present();

                this.vendaService.delete(venda)
                    .subscribe(() => {
                            this.loadVendas();
                            loader.dismiss();
                            this.dialogo.exibirToast("Venda apagada com sucesso.");
                        },
                        error => {
                            // TODO tratar erros
                            console.log(error);
                        })
            }
        });
    }

    insert() {
        let modalDadosVenda = this.modalCtrl.create('VendaInsertPage');

        modalDadosVenda.present();

        modalDadosVenda.onDidDismiss(vendido => {
            if (vendido) {
                this.loadVendas();
            }
        });
    }

    loadVendas() {
        let loader = this.loader.exibirLoaderPadrao("Carregando as vendas.");
        loader.present();

        this.vendaService.findAll()
            .subscribe(response => {
                    this.vendas = response;
                    loader.dismiss();
                },
                error => {
                    // TODO tratar erros
                    loader.dismiss();
                    console.log(error);
                });
    }
}
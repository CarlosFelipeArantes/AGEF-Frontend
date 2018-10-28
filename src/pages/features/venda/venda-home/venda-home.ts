import {Events, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {DialogoProvider} from "../../../../injectables/dialogo";
import {LoaderProvider} from "../../../../injectables/loader";
import {VendaDTO} from '../../../../models/venda.dto';
import {VendaService} from '../../../../services/domain/venda.service';
import * as _ from "underscore";

@IonicPage()
@Component({
    selector: 'page-venda-home',
    templateUrl: 'venda-home.html'
})
export class VendaHomePage {

    itemExpandHeight: number = 35;
    vendas: VendaDTO[];
    vendasGroupByDate: any;

    constructor(
        public dialogo: DialogoProvider,
        public events: Events,
        public loaderProvider: LoaderProvider,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public vendaService: VendaService) {
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewWillEnter() {
        // TODO criar uma forma de apresentar o loader. A UX não fica legal com loader a todo momento.
        let loader = this.loaderProvider.exibirLoaderPadrao("Carregando as vendas.");
        loader.present();

        this.loadVendas();

        loader.dismiss();
    }

    delete(venda: VendaDTO) {
        let mensagem = 'Você realmente quer apagar esse registro de venda?';
        let titulo = 'Confirmar Remoção';
        let alert = this.dialogo.exibirDialogoConfirmacao(mensagem, titulo);

        alert.present();

        alert.onDidDismiss((confirmado) => {
            if (confirmado) {
                let loader = this.loaderProvider.exibirLoaderPadrao("Apagando a venda.");
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

    expandItem(dataVendaArg, vendaArg) {
        this.vendasGroupByDate.map((dataVenda) => {
            if (dataVendaArg === dataVenda) {
                dataVenda.map((venda) => {
                    if (vendaArg == venda) {
                        venda.expanded = !venda.expanded;
                    } else {
                        venda.expanded = false;
                    }

                    return venda
                });
            }
            return dataVenda;
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
        this.vendaService.findAll()
            .subscribe(response => {
                    this.vendas = response;
                    this.vendasGroupByDate = this.splitVendaByDate(this.vendas);
                },
                error => {
                    // TODO tratar erros
                    console.log(error);
                });
    }

    splitVendaByDate(vendas) {
        return _.chain(vendas)
            .groupBy(function (obj) {
                return obj.data;
            })
            .sortBy(function (v, k) {
                return v;
            })
            .reverse()
            .value();
    }

}
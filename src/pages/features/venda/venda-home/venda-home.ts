import {Events, IonicPage, Loading, ModalController, NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {DialogoProvider} from "../../../../injectables/dialogo";
import {LoadingProvider} from "../../../../injectables/loading";
import {VendaDTO} from '../../../../models/venda.dto';
import {VendaService} from '../../../../services/domain/venda.service';
import * as _ from "underscore";

@IonicPage()
@Component({
    selector: 'page-venda-home',
    templateUrl: 'venda-home.html'
})
export class VendaHomePage {

    loading: Loading;
    isLoadingDismissed: boolean = true;
    itemExpandHeight: number = 35;
    vendas: VendaDTO[];
    vendasGroupByDate: any;

    constructor(
        public dialogo: DialogoProvider,
        public events: Events,
        public loaderProvider: LoadingProvider,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public vendaService: VendaService) {
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewWillEnter() {
        this.loadVendas();
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidLoad() {
        // Dismiss é feito no *ngFor.
        this.loading = this.loaderProvider.exibirLoadingPadrao("Carregando as vendas.");
        this.presentLoading(true);
    }

    delete(venda: VendaDTO) {
        let mensagem: string = 'Você realmente quer apagar esse registro de venda?';
        let titulo: string = 'Confirmar Remoção';
        let alert = this.dialogo.exibirDialogoConfirmacao(mensagem, titulo);

        alert.present();

        alert.onDidDismiss((confirmado) => {
            if (confirmado) {
                this.loading = this.loaderProvider.exibirLoadingPadrao("Apagando a venda.");
                this.presentLoading(true);

                this.vendaService.delete(venda)
                    .subscribe(() => {
                            this.loadVendas();
                            this.presentLoading(false);
                            this.dialogo.exibirToast("Venda apagada com sucesso.");
                        },
                        error => {
                            // TODO tratar erros
                            console.log(error);
                        })
            }
        });
    }

    expandItem(vendaArg) {
        this.vendasGroupByDate.map((dataVenda) => {
            dataVenda.map((venda) => {
                if (vendaArg == venda) {
                    venda.expanded = !venda.expanded;
                } else {
                    venda.expanded = false;
                }
            });
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
                    this.vendasGroupByDate = VendaHomePage.splitVendaByDate(this.vendas);
                },
                error => {
                    // TODO tratar erros
                    console.log(error);
                });
    }

    presentLoading(shouldPresent: boolean) {
        if (shouldPresent && this.isLoadingDismissed) {
            this.loading.present();
            this.isLoadingDismissed = false;

        } else if (!shouldPresent && !this.isLoadingDismissed) {
            this.loading.dismiss();
            this.isLoadingDismissed = true;
        }
    }

    private static splitVendaByDate(vendas) {
        return _.chain(vendas)
            .groupBy(function (obj) {
                return obj.data;
            })
            .sortBy(function (v) {
                return v;
            })
            .reverse()
            .value();
    }
}
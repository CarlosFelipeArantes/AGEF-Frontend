import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {VendaService} from '../../../../services/domain/venda.service';
import {VendaDTO} from '../../../../models/venda.dto';
import {DialogoProvider} from "../../../../injectables/dialogo";
import {LoaderProvider} from "../../../../injectables/loader";

@IonicPage()
@Component({
    selector: 'vendas-visualizar',
    templateUrl: 'vendas.html',
})
export class showVendasPage {

    vendas: VendaDTO[];

    constructor(
        public dialogo: DialogoProvider,
        public events: Events,
        public loader: LoaderProvider,
        public navCtrl: NavController,
        public navParams: NavParams,
        public vendaService: VendaService) {
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidEnter() {
        this.loadData();
    }

    loadData() {
        this.vendaService.findAll()
            .subscribe(response => {
                    this.vendas = response;
                },
                error => {
                    // TODO tratar erros
                    console.log(error);
                });
    }

    delete(venda: VendaDTO) {
        let mensagem = 'Você realmente quer apagar esse registro de venda?';
        let titulo = 'Confirmar Remoção';
        let alert = this.dialogo.exibirDialogoConfirmacao(mensagem, titulo);

        alert.present();

        alert.onDidDismiss((confirmado) => {
            if (confirmado) {
                let loader = this.loader.exibirLoaderPadrao("Trabalhando para apagar a venda.");
                loader.present();

                this.vendaService.delete(venda)
                    .subscribe(() => {
                            this.loadData();
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
}
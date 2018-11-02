import {Events, IonicPage, Loading, ModalController, NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {DialogoProvider} from "../../../injectables/dialogo";
import {LoadingProvider} from "../../../injectables/loading";
import {FaturamentoService} from '../../../services/domain/faturamento.service';
import {VendaDTO} from '../../../models/venda.dto';

@IonicPage()
@Component({
    selector: 'page-faturamento',
    templateUrl: 'faturamento.html',
})
export class FaturamentoPage {

    loading: Loading;
    isLoadingDismissed: boolean = true;
    itemExpandHeight: number = 35;
    vendas: VendaDTO[];
    dataInicio : Date;
    dataFinal : Date;

    constructor(
        public dialogo: DialogoProvider,
        public events: Events,
        public loaderProvider: LoadingProvider,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public faturamentoService: FaturamentoService){
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewWillEnter() {

    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidLoad() {
        // Dismiss é feito no *ngFor.
        this.loading = this.loaderProvider.exibirLoadingPadrao("Carregando.");
        this.presentLoading(true);
    }

    loadFaturamento() {
        this.faturamentoService.findByDateBetween(this.dataInicio,this.dataFinal)
            .subscribe(response => {
                    this.vendas = response;
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
}
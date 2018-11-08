import {Component} from '@angular/core';
import {IonicPage, Loading, NavController, NavParams, ViewController} from 'ionic-angular';
import {VendaDTO} from "../../../../models/venda.dto";
import {DialogoProvider} from "../../../../injectables/dialogo";
import {LoadingProvider} from "../../../../injectables/loading";
import {VendaService} from "../../../../services/domain/venda.service";
import {UtilsService} from "../../../../services/utils/utils.service";

/**
 * Generated class for the VendaDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-venda-details',
    templateUrl: 'venda-details.html',
})
export class VendaDetailsPage {

    isLoadingDismissed: boolean = true;
    loading: Loading;
    prevScreenNeedReload: boolean = false;
    vendas: VendaDTO[];
    vendasGroupedByDate: any[];

    constructor(
        public dialogoProvider: DialogoProvider,
        public loadingProvider: LoadingProvider,
        public navCtrl: NavController,
        public navParams: NavParams,
        public utilsService: UtilsService,
        public vendaService: VendaService,
        public viewCtrl: ViewController) {

        this.vendas = this.navParams.data;
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewWillEnter() {
        this.vendasGroupedByDate = this.splitVendaByDate(this.vendas);
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidLoad() {
        this.loading = this.loadingProvider.exibirLoadingPadrao("Carregando as vendas.");
        this.presentLoading(true);
    }

    public onClickDismissModal(): void {
        this.viewCtrl.dismiss(this.prevScreenNeedReload);
    }

    public delete(venda: VendaDTO): void {
        let mensagem: string = 'Você realmente quer apagar esse registro de venda?';
        let titulo: string = 'Confirmar Remoção';
        let alert = this.dialogoProvider.exibirDialogoConfirmacao(mensagem, titulo);

        alert.present();

        alert.onDidDismiss((confirmado) => {
            if (confirmado) {
                this.loading = this.loadingProvider.exibirLoadingPadrao("Apagando a venda.");
                this.presentLoading(true);

                this.vendaService.estornar(venda)
                    .subscribe(() => {
                            this.reloadData(venda);
                            this.prevScreenNeedReload = true;
                            this.presentLoading(false);
                            this.dialogoProvider.exibirToast("Venda apagada com sucesso.");
                        },

                        error => {
                            // TODO tratar erros
                            console.log(error);
                        })
            }
        });
    }

    public mascaraDinheiro(valor: number): string {
        return this.utilsService.mascaraDinheiro(valor);
    }

    public presentLoading(shouldPresent: boolean): void {
        if (shouldPresent && this.isLoadingDismissed) {
            this.loading.present();
            this.isLoadingDismissed = false;

        } else if (!shouldPresent && !this.isLoadingDismissed) {
            this.loading.dismiss();
            this.isLoadingDismissed = true;
        }
    }

    public reloadData(venda: VendaDTO): void {
        if (this.vendas.length > 1) {
            let indexOfVenda = this.vendas.indexOf(venda);
            this.vendas.splice(indexOfVenda, 1);
            this.vendasGroupedByDate = this.splitVendaByDate(this.vendas);

        } else {
            this.viewCtrl.dismiss(true);
        }
    }

    public splitVendaByDate(vendas: VendaDTO[]): any[][] {
        let vendasByDate = vendas
            .reduce((r, v, i, a, k = v.data) => ((r[k] || (r[k] = []))
                .push(v), r), {});

        return Object.values(vendasByDate);
    }

}

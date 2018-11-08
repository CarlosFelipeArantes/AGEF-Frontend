import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {VendaDTO} from "../../../../models/venda.dto";
import {UtilsService} from "../../../../services/utils/utils.service";

/**
 * Generated class for the FaturamentoDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-faturamento-details',
    templateUrl: 'faturamento-details.html',
})
export class FaturamentoDetailsPage {

    dataInicial: string;
    dataFinal: string;
    vendas: VendaDTO[];
    vendasGroupedByDate: any[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public utilsService: UtilsService,
        public viewCtrl: ViewController) {

        this.dataInicial = this.navParams.get("dataInicial");
        this.dataFinal = this.navParams.get("dataFinal");
        this.vendas = this.navParams.get("vendas");
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewWillEnter() {
        this.vendasGroupedByDate = this.splitVendaByDate(this.vendas);
    }

    public calcQtdTotalPecasVendidas(): number {
        return this.vendas.reduce(function (acc, venda) {
            return acc + venda.quantidade;
        }, 0);
    }

    public calcVlrTotalVendas(vendas: VendaDTO[]): string {
        let valorTotal = vendas.reduce(function (acc, venda) {
            return acc + (venda.preco * venda.quantidade);
        }, 0);

        return this.mascaraDinheiro(valorTotal);
    }

    public mascaraDinheiro(valor: number): string {
        return this.utilsService.mascaraDinheiro(valor);
    }

    public onClickDismissModal(): void {
        this.viewCtrl.dismiss();
    }

    public splitVendaByDate(vendas: VendaDTO[]): any[][] {
        let vendasByDate = vendas
            .reduce((r, v, i, a, k = v.data) => ((r[k] || (r[k] = []))
                .push(v), r), {});

        return Object.values(vendasByDate);
    }

}

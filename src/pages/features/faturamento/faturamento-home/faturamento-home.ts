import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {VendaService} from "../../../../services/domain/venda.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VendaDTO} from "../../../../models/venda.dto";
import {DatePipe} from "@angular/common";
import {LoadingProvider} from "../../../../injectables/loading";

/**
 * Generated class for the FaturamentoHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-faturamento-home',
    templateUrl: 'faturamento-home.html',
})
export class FaturamentoHomePage {

    filtro: string = "Mês";
    dataMax: string = new Date().toISOString();
    formGroup: FormGroup;
    vendas: VendaDTO[];

    constructor(
        public datePipe: DatePipe,
        public formBuilder: FormBuilder,
        public loadingProvider: LoadingProvider,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public vendaService: VendaService) {

        this.formGroup = this.formBuilder.group({
            dataInicial: [this.primeiroDiaMes().toISOString(), [Validators.required]],
            dataFinal: [new Date().toISOString(), [Validators.required]]
        })
    }

    public recuperarDadosVendas(): void {
        let loading = this.loadingProvider.exibirLoadingPadrao("Carregando os dados das vendas.");
        loading.present();

        let dataInicialArg: string = this.formGroup.controls.dataInicial.value;
        let dataFinalArg: string = this.formGroup.controls.dataFinal.value;

        let dataInicial = this.datePipe.transform(dataInicialArg, 'dd/MM/yyyy');
        let dataFinal = this.datePipe.transform(dataFinalArg, 'dd/MM/yyyy');

        this.vendaService.findByDataBetween(dataInicial, dataFinal)
            .subscribe(response => {
                    loading.dismiss();
                    this.exibirModalFaturamento(dataInicial, dataFinal, response);
                },

                error => {
                    // TODO tratar erros
                    console.log(error);
                });
    }

    public onClickInserirDatasMesAtual(): void {
        let dataInicial = this.primeiroDiaMes();
        let dataFinal = this.dataMax;

        this.formGroup.controls.dataInicial.setValue(dataInicial.toISOString());
        this.formGroup.controls.dataFinal.setValue(dataFinal);
    }

    public primeiroDiaMes(): Date {
        let hoje = new Date();

        let ano = hoje.getFullYear();
        let mes = hoje.getMonth();

        return new Date(ano, mes, 1);
    }

    public exibirModalFaturamento(dataInicial: string, dataFinal: string, vendas: VendaDTO[]): void {
        let dados = {
            dataInicial: dataInicial,
            dataFinal: dataFinal,
            vendas: vendas
        };

        let modalDetalhesFaturamento = this.modalCtrl.create('FaturamentoDetailsPage', dados);

        modalDetalhesFaturamento.present();
    }

}

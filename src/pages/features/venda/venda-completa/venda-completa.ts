import {Events, IonicPage, Loading, ModalController, NavController, NavParams, Select, ViewController} from 'ionic-angular';
import {Component, ViewChild} from '@angular/core';
import {DialogoProvider} from "../../../../injectables/dialogo";
import {LoadingProvider} from "../../../../injectables/loading";
import {VendaDTO} from '../../../../models/venda.dto';
import {VendaService} from '../../../../services/domain/venda.service';
import {DatePipe} from "@angular/common";
import {UtilsService} from "../../../../services/utils/utils.service";
import {PecaFeiraService} from "../../../../services/domain/peca-feira.service";

@IonicPage()
@Component({
    selector: 'page-venda-completa',
    templateUrl: 'venda-completa.html'
})
export class VendaCompletaPage {

    filtro: string = 'Hoje';
    loading: Loading;
    loadingEstaPresente: boolean = true;
    vendas: VendaDTO[];
    qtdTotalVendas: number;

    @ViewChild('selectFiltro') selectRef: Select;

    constructor(
        public datePipe: DatePipe,
        public dialogo: DialogoProvider,
        public events: Events,
        public loadingProvider: LoadingProvider,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public pecaFeiraService: PecaFeiraService,
        public utilsService: UtilsService,
        public vendaService: VendaService) {
    }

    
    ionViewWillEnter() {
        this.recuperarDadosVendas();
    }

    
    ionViewDidLoad() {
        // Dismiss é feito no *ngFor.
        this.loading = this.loadingProvider.exibirLoadingPadrao("Carregando as vendas.");
        this.mostrarLoading(true);
    }
    
    public atualizarDadosVendas(vendas: VendaDTO[]): void {
        this.qtdTotalVendas = vendas.length;
    }

    onClickFecharModal() {
        this.viewCtrl.dismiss(false);
    }
    
    public findAllVendas(): void {
        this.vendaService.findAll()
            .subscribe(response => {
                this.vendas = response;

                if (this.vendas !== null) {
                    this.atualizarDadosVendas(this.vendas);

                } else {
                    this.mostrarLoading(false);
                }
                },

                error => {
                    // TODO tratar erros
                    console.log(error);
                });

    }

    public findVendasByDataBetween(dataInicialArg: Date, dataFinalArg: Date): void {
        let dataInicial = this.datePipe.transform(dataInicialArg, 'dd/MM/yyyy');
        let dataFinal = this.datePipe.transform(dataFinalArg, 'dd/MM/yyyy');

        this.vendaService.findByDataBetween(dataInicial, dataFinal)
            .subscribe(response => {
                this.vendas = response;

                if (this.vendas !== null) {
                    this.atualizarDadosVendas(this.vendas);

                } else {
                    this.mostrarLoading(false);
                }
                },

                error => {
                    // TODO tratar erros
                    console.log(error);
                });
    }

    public findVendasByDia(dia: Date): void {
        this.findVendasByDataBetween(dia, dia);
    }

    public onClickAbrirOpcoesFiltro(): void {
        this.selectRef.open();
    }

    public onChangeRcprVendasComFiltro(): void {
        this.recuperarDadosVendas();
    }

    public mostrarLoading(deveMostrar: boolean): void {
        if (deveMostrar && this.loadingEstaPresente) {
            this.loading.present();
            this.loadingEstaPresente = false;

        } else if (!deveMostrar && !this.loadingEstaPresente) {
            this.loading.dismiss();
            this.loadingEstaPresente = true;
        }
    }

    public recuperarDadosVendas(): void {
        let hoje = new Date();

        if (this.filtro === "Mês") {
            let ano = hoje.getFullYear();
            let mes = hoje.getMonth();

            let dataInicial = new Date(ano, mes, 1);
            let dataFinal = new Date(ano, mes + 1, 0);

            this.findVendasByDataBetween(dataInicial, dataFinal);

        } else if (this.filtro === "Hoje") {
            this.findVendasByDia(hoje);

        } else if (this.filtro === "Total") {
            this.findAllVendas();

        } else {
            console.log("Erro");
        }

        this.mostrarLoading(false);
    }

    public recuperarNomePeca(venda: VendaDTO) {
        return venda.pecaFeira.modelo.nome + ' - ' + venda.pecaFeira.modelo.tamanho;
    }

    public recuperarQtdVendas(venda: VendaDTO): number {
        return venda.quantidade;
    }
    
    public mascaraDinheiro(valor: number): string {
        return this.utilsService.mascaraDinheiro(valor);
    }
}
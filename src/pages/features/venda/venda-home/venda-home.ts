import {Events, IonicPage, Loading, ModalController, NavController, NavParams, Select} from 'ionic-angular';
import {Component, ViewChild} from '@angular/core';
import {DialogoProvider} from "../../../../injectables/dialogo";
import {LoadingProvider} from "../../../../injectables/loading";
import {VendaDTO} from '../../../../models/venda.dto';
import {VendaService} from '../../../../services/domain/venda.service';
import {PecaFeiraDTO} from "../../../../models/pecaFeira.dto";
import {DatePipe} from "@angular/common";
import {UtilsService} from "../../../../services/utils/utils.service";

@IonicPage()
@Component({
    selector: 'page-venda-home',
    templateUrl: 'venda-home.html'
})
export class VendaHomePage {

    filtro: string = 'Hoje';
    loading: Loading;
    isLoadingDismissed: boolean = true;
    qtdTotalVendas: number;
    vendasGroupedByPeca: any[][];

    @ViewChild('selectFiltro') selectRef: Select;

    constructor(
        public datePipe: DatePipe,
        public dialogo: DialogoProvider,
        public events: Events,
        public loadingProvider: LoadingProvider,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public utilsService: UtilsService,
        public vendaService: VendaService) {
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewWillEnter() {
        this.findByFilter();
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidLoad() {
        // Dismiss é feito no *ngFor.
        this.loading = this.loadingProvider.exibirLoadingPadrao("Carregando as vendas.");
        this.presentLoading(true);
    }

    public delete(venda: VendaDTO): void {
        let mensagem: string = 'Você realmente deseja apagar todos os registro de venda desta peça?';
        let titulo: string = 'Confirmar Remoção';
        let alert = this.dialogo.exibirDialogoConfirmacao(mensagem, titulo);

        alert.present();

        alert.onDidDismiss((confirmado) => {
            if (confirmado) {
                this.loading = this.loadingProvider.exibirLoadingPadrao("Apagando a venda.");
                this.presentLoading(true);

                this.vendaService.delete(venda)
                    .subscribe(() => {
                            this.findByFilter();
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

    public estornar(qtdVendasPeca: number, vendas: VendaDTO[]): void {
        let venda = this.findLastVendaWhereQtdUm(vendas);

        if (qtdVendasPeca === 0) {
            let mensagem = "Não existem mais vendas deste produto nesta data.";
            let titulo = "Não existem vendas";

            this.dialogo.exibirDialogoInformacao(mensagem, titulo);

        } else if (venda === undefined) {
            let mensagem = "Para remover vendas com quantidades de peças vendidas diferentes de 1, entre na tela de detalhes.";
            let titulo = "Remova na Tela de Detalhes";

            this.dialogo.exibirDialogoInformacao(mensagem, titulo);

        } else {
            this.vendaService.estornar(venda)
                .subscribe(() => {
                        this.findByFilter();
                        this.dialogo.exibirToast("Venda apagada com sucesso.");
                    },
                    error => {
                        // TODO tratar erros
                        console.log(error);
                    });

        }
    }

    public findAll() {
        this.vendaService.findAll()
            .subscribe(response => {
                    this.loadData(response);
                    return response;
                },

                error => {
                    // TODO tratar erros
                    console.log(error);
                });

    }

    public findByDataBetween(dataInicialArg: Date, dataFinalArg: Date): void {
        let dataInicial = this.datePipe.transform(dataInicialArg, 'dd/MM/yyyy');
        let dataFinal = this.datePipe.transform(dataFinalArg, 'dd/MM/yyyy');

        this.vendaService.findByDataBetween(dataInicial, dataFinal)
            .subscribe(response => {
                    this.loadData(response);
                    return response;
                },

                error => {
                    // TODO tratar erros
                    console.log(error);
                });
    }

    public findByDia(dia: Date) {
        this.findByDataBetween(dia, dia);
    }

    public findByFilter(): void {
        let hoje = new Date();

        if (this.filtro === "Mês") {
            let ano = hoje.getFullYear();
            let mes = hoje.getMonth();

            let dataInicial = new Date(ano, mes, 1);
            let dataFinal = new Date(ano, mes + 1, 0);

            this.findByDataBetween(dataInicial, dataFinal);

        } else if (this.filtro === "Hoje") {
            this.findByDia(hoje);

        } else if (this.filtro === "Total") {
            this.findAll();

        } else {
            console.log("Erro");
        }
    }

    public findLastVendaWhereQtdUm(vendas: VendaDTO[]): VendaDTO {
        return vendas
            .reverse()
            .find(function (venda) {
                return venda.quantidade === 1;
            });
    }

    public getValorTotalVendaByPeca(vendaByPeca: any[]): string {
        let valorTotal = vendaByPeca.reduce(function (acc, venda) {
            return acc + (venda.preco * venda.quantidade);
        }, 0);

        valorTotal = valorTotal.toFixed(2);

        return this.utilsService.mascaraDinheiro(+valorTotal);
    }

    public insert(): void {
        let modalDadosVenda = this.modalCtrl.create('VendaInsertPage');

        modalDadosVenda.present();

        modalDadosVenda.onDidDismiss(vendido => {
            if (vendido) {
                this.findByFilter();
            }
        });
    }

    public insertOne(pecaArg: PecaFeiraDTO): void {
        let data = new Date().toISOString();
        let peca = pecaArg;
        let preco = pecaArg.preco;
        let quantidade = 1;
        let venda: any = {
            data: this.datePipe.transform(data, 'dd/MM/yyyy'),
            pecaFeira: peca,
            preco: preco,
            quantidade: quantidade
        };

        this.vendaService.insert(venda)
            .subscribe(() => {
                    this.dialogo.exibirToast("Venda registrada com sucesso.");
                    this.findByFilter();
                },
                error => {
                    if (error.status === 400) {
                        let mensagem = "Não existem mais peças no estoque.";
                        let titulo = "Estoque vazio";

                        this.dialogo.exibirDialogoInformacao(mensagem, titulo);
                    }

                    console.log(error);
                })
    }

    public loadData(vendas: VendaDTO[]): void {
        this.qtdTotalVendas = vendas.length;
        this.vendasGroupedByPeca = this.splitVendaByPeca(vendas);
    }

    public onFiltroChange() {
        this.findByFilter();
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

    public showDetails(vendas: any[]): void {
        let modalDetalhesVenda = this.modalCtrl.create('VendaDetailsPage', vendas);

        modalDetalhesVenda.present();

        modalDetalhesVenda.onDidDismiss(needsReload => {
            if (needsReload) {
                this.findByFilter();
            }
        });
    }

    public showFilters(): void {
        this.selectRef.open();
    }

    public splitVendaByPeca(vendas: VendaDTO[]): any[][] {
        let vendasByPeca = vendas
            .reduce((r, v, i, a, k = (v.pecaFeira.modelo.nome + ' - ' + v.pecaFeira.modelo.tamanho)) => ((r[k] || (r[k] = [])).push(v), r), {});

        return Object.values(vendasByPeca);
    }
}
import {Events, IonicPage, Loading, ModalController, NavController, NavParams, Select} from 'ionic-angular';
import {Component, ViewChild} from '@angular/core';
import {DialogoProvider} from "../../../../injectables/dialogo";
import {LoadingProvider} from "../../../../injectables/loading";
import {VendaDTO} from '../../../../models/venda.dto';
import {VendaService} from '../../../../services/domain/venda.service';
import {PecaFeiraDTO} from "../../../../models/pecaFeira.dto";
import {MensagemDTO} from "../../../../models/mensagem.dto";
import {DatePipe} from "@angular/common";
import {UtilsService} from "../../../../services/utils/utils.service";
import {PecaFeiraService} from "../../../../services/domain/peca-feira.service";
import {VendaCompletaPage} from '../venda-completa/venda-completa';
import {Socket} from 'ng-socket-io';

@IonicPage()
@Component({
    selector: 'page-venda-home',
    templateUrl: 'venda-home.html',
})

export class VendaHomePage {

    filtro: string = 'Hoje';
    loading: Loading;
    loadingEstaPresente: boolean = true;
    pecas: PecaFeiraDTO[];
    qtdTotalVendas: number;
    vendasAgrupadasPorPeca: any[][];
    vendasCompletas: VendaCompletaPage

    @ViewChild('selectFiltro') selectRef: Select;

    constructor(
        public datePipe: DatePipe,
        public dialogo: DialogoProvider,
        public events: Events,
        public loadingProvider: LoadingProvider,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public pecaFeiraService: PecaFeiraService,
        public utilsService: UtilsService,
        public vendaService: VendaService,
        private socket: Socket) {
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewWillEnter() {
        this.recuperarDadosVendas();
        this.recuperarDadosPecas();
        this.socket.connect();

    }

    ionViewWillLeave(){
        this.socket.disconnect();
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidLoad() {
        // Dismiss é feito no *ngFor.
        this.loading = this.loadingProvider.exibirLoadingPadrao("Carregando as vendas.");
        this.mostrarLoading(true);
    }

    public agruparVendasPorPeca(vendas: VendaDTO[]): any {
        return vendas.reduce((r, v, i, a, k = (v.pecaFeira.modelo.nome + ' - ' + v.pecaFeira.modelo.tamanho)) => ((r[k] || (r[k] = [])).push(v), r), {});
    }

    public atualizarDadosVendas(vendas: VendaDTO[]): void {
        this.qtdTotalVendas = vendas.length;
        this.vendasAgrupadasPorPeca = this.agruparVendasPorPeca(vendas);
    }

    public calcValorTotalVendasPorPeca(peca: PecaFeiraDTO): string {
        let nomePeca: string = this.recuperarNomePeca(peca);
        let valorTotal: number = 0;
        let vendas: VendaDTO[] = null;

        if (!this.utilsService.estaVazio(this.vendasAgrupadasPorPeca)) {
            vendas = this.vendasAgrupadasPorPeca[nomePeca];

            if (vendas !== undefined) {
                valorTotal = vendas.reduce(function (acc, venda) {
                    return acc + (venda.preco * venda.quantidade);
                }, 0);
            }
        }

        return this.utilsService.mascaraDinheiro(valorTotal);
    }

    public findAllVendas(): void {
        this.vendaService.findAll()
            .subscribe(response => {
                    this.atualizarDadosVendas(response);
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
                    this.atualizarDadosVendas(response);
                },

                error => {
                    // TODO tratar erros
                    console.log(error);
                });
    }

    public findVendasByDia(dia: Date): void {
        this.findVendasByDataBetween(dia, dia);
    }

    public findUltimaVendaQuantidadeIgualUm(vendas: VendaDTO[]): VendaDTO {
        return vendas
            .reverse()
            .find(function (venda) {
                return venda.quantidade === 1;
            });
    }

    public onClickAbrirModalCadastroVenda(): void {
        let modalDadosVenda = this.modalCtrl.create('VendaInsertPage');

        modalDadosVenda.present();

        modalDadosVenda.onDidDismiss(vendido => {
            if (vendido) {
                this.recuperarDadosVendas();
            }
        });
    }

    public onClickAbrirModalDetalhesVenda(peca: PecaFeiraDTO): void {
        let nomePeca = this.recuperarNomePeca(peca);
        let vendas = this.vendasAgrupadasPorPeca[nomePeca];

        if (vendas !== undefined) {
            let modalDetalhesVenda = this.modalCtrl.create('VendaDetailsPage', vendas);

            modalDetalhesVenda.present();

            modalDetalhesVenda.onDidDismiss(needsReload => {
                if (needsReload) {
                    this.recuperarDadosVendas();
                }
            });

        } else {
            let mensagem = "Não existem vendas desta peça.";
            let titulo = "Nenhuma venda";

            this.dialogo.exibirDialogoInformacao(mensagem, titulo);
        }
    }

    public onClickAbrirOpcoesFiltro(): void {
        this.selectRef.open();
    }

    public onClickCadastrarUmaVenda(pecaArg: PecaFeiraDTO): void {
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
                    this.recuperarDadosVendas();
                    let mensagem: MensagemDTO = { 
                        operacao:"venda",
                        venda:venda,
                    };
                    
                    this.socket.emit('vendi', mensagem);
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

    public onClickEstornarVenda(peca: PecaFeiraDTO): void {
        let nomePeca = this.recuperarNomePeca(peca);
        let qtdVendasPeca = 0;
        let venda = undefined;
        let vendas = this.vendasAgrupadasPorPeca[nomePeca];

        if (vendas !== undefined) {
            qtdVendasPeca = vendas.length;
            venda = this.findUltimaVendaQuantidadeIgualUm(vendas);
        }

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
                        this.recuperarDadosVendas();
                        this.dialogo.exibirToast("Venda apagada com sucesso.");
                        let mensagem: MensagemDTO = { 
                            operacao:"estorno",
                            venda:venda,
                        };
                        
                        this.socket.emit('vendi', mensagem);
                    },
                    error => {
                        // TODO tratar erros
                        console.log(error);
                    });

        }
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

    public recuperarDadosPecas(): void {
        this.pecaFeiraService.findAll()
            .subscribe(response => {
                    this.pecas = response;
                },
                error => {
                    console.log(error);
                });

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

    public recuperarNomePeca(peca: PecaFeiraDTO) {
        return peca.modelo.nome + ' - ' + peca.modelo.tamanho;
    }

    public recuperarQtdVendas(peca: PecaFeiraDTO): number {
        let nomePeca = this.recuperarNomePeca(peca);
        let qtdVendas = 0;

        if (!this.utilsService.estaVazio(this.vendasAgrupadasPorPeca)) {
            let vendas = this.vendasAgrupadasPorPeca[nomePeca];

            if (vendas !== undefined) {
                qtdVendas = vendas.length;
            }
        }

        return qtdVendas;
    }

    public onClickAbrirVendasCompletas(): void {
        let modalVendaCompleta = this.modalCtrl.create('VendaCompletaPage');

        modalVendaCompleta.present();
    }

}
import {Events, IonicPage, Loading, ModalController, NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {DialogoProvider} from "../../../../injectables/dialogo";
import {LoadingProvider} from "../../../../injectables/loading";
import {VendaDTO} from '../../../../models/venda.dto';
import {VendaService} from '../../../../services/domain/venda.service';
import {PecaFeiraDTO} from "../../../../models/pecaFeiraDTO";
import {DatePipe} from "@angular/common";

@IonicPage()
@Component({
    selector: 'page-venda-home',
    templateUrl: 'venda-home.html'
})
export class VendaHomePage {

    loading: Loading;
    isLoadingDismissed: boolean = true;
    qtdTotalVendas: number;
    vendasGroupedByPeca: any[][];

    constructor(
        public datePipe: DatePipe,
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
        this.loadScreenData();
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidLoad() {
        // Dismiss é feito no *ngFor.
        this.loading = this.loaderProvider.exibirLoadingPadrao("Carregando as vendas.");
        this.presentLoading(true);
    }

    public delete(venda: VendaDTO): void {
        let mensagem: string = 'Você realmente deseja apagar todos os registro de venda desta peça?';
        let titulo: string = 'Confirmar Remoção';
        let alert = this.dialogo.exibirDialogoConfirmacao(mensagem, titulo);

        alert.present();

        alert.onDidDismiss((confirmado) => {
            if (confirmado) {
                this.loading = this.loaderProvider.exibirLoadingPadrao("Apagando a venda.");
                this.presentLoading(true);

                this.vendaService.delete(venda)
                    .subscribe(() => {
                            this.loadScreenData();
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
                        this.loadScreenData();
                        this.dialogo.exibirToast("Venda apagada com sucesso.");
                    },
                    error => {
                        // TODO tratar erros
                        console.log(error);
                    });

        }
    }

    //TODO-Eric implementar modal de detalhes
    public showDetails(vendas: any[]): void {
        console.log(vendas);
    }

    public findLastVendaWhereQtdUm(vendas: VendaDTO[]): VendaDTO {
        return vendas
            .reverse()
            .find(function (venda) {
                return venda.quantidade === 1;
            });
    }

    public getValorTotalVendaByPeca(vendaByPeca: any[]): number {
        return vendaByPeca.reduce(function (acc, venda) {
            return acc + (venda.preco * venda.quantidade);
        }, 0);
    }

    public insert(): void {
        let modalDadosVenda = this.modalCtrl.create('VendaInsertPage');

        modalDadosVenda.present();

        modalDadosVenda.onDidDismiss(vendido => {
            if (vendido) {
                this.loadScreenData();
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
                    this.loadScreenData();
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

    public loadScreenData(): void {
        this.vendaService.findAll()
            .subscribe(response => {
                    let vendas = response;
                    this.qtdTotalVendas = vendas.length;
                    this.vendasGroupedByPeca = VendaHomePage.splitVendaByPeca(vendas);
                },

                error => {
                    // TODO tratar erros
                    console.log(error);
                });
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

    private static splitVendaByPeca(vendas: VendaDTO[]): any[][] {
        let vendasByPeca = vendas
            .reduce((r, v, i, a, k = (v.pecaFeira.modelo.nome + ' - ' + v.pecaFeira.modelo.tamanho)) => ((r[k] || (r[k] = [])).push(v), r), {});

        return Object.values(vendasByPeca);
    }
}
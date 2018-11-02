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
    vendasGroupByDateAndByPeca: any[][];

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
        this.loadVendas();
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

    public estornar(qtdVendasPeca: number): void {

        console.log(qtdVendasPeca);

        // if (qtdVendasPeca > 0) {
        //     this.vendaService.estornar(this.lastVendaQtdUm)
        //         .subscribe(() => {
        //                 this.loadVendas();
        //                 this.dialogo.exibirToast("Venda apagada com sucesso.");
        //             },
        //             error => {
        //                 // TODO tratar erros
        //                 console.log(error);
        //             });
        //
        // } else {
        //     let mensagem = "Não existem mais vendas deste produto nesta data.";
        //     let titulo = "Não existem vendas";
        //
        //     this.dialogo.exibirDialogoInformacao(mensagem, titulo);
        // }
    }

    //TODO-Eric implementar modal de detalhes
    public detalhes(vendaByPeca: any[]): void {
        console.log(vendaByPeca);
    }

    public getQtdTotalVendasByDate(vendaByDate: any[]): number {
        return vendaByDate.reduce(function (acc, venda) {
            return acc + venda.length;
        }, 0);
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
                this.loadVendas();
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
            .subscribe((response) => {
                    // this.lastVendaQtdUm = response;
                    this.dialogo.exibirToast("Venda registrada com sucesso.");
                    this.loadVendas();
                    console.log(response);
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

    public loadVendas(): void {
        this.vendaService.findAll()
            .subscribe(response => {
                    let vendas = response;
                    let vendasGroupByDate = VendaHomePage.splitVendaByDate(vendas);
                    this.vendasGroupByDateAndByPeca = VendaHomePage.splitVendaByPeca(vendasGroupByDate);
                    console.log(this.vendasGroupByDateAndByPeca);
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

    private static splitVendaByDate(vendas: VendaDTO[]): any[][] {
        let vendasByDate = vendas
            .reduce((r, v, i, a, k = v.data) => ((r[k] || (r[k] = [])).push(v), r), {});

        return Object.values(vendasByDate);
    }

    private static splitVendaByPeca(vendasByDateArg: any[][]): any[][] {
        let vendasByDateAndByPeca = vendasByDateArg
            .map((vendasByDate) => {
                let vendasByDateAndByPeca = vendasByDate
                    .reduce((r, v, i, a, k = (v.pecaFeira.modelo.nome + ' - ' + v.pecaFeira.modelo.tamanho)) => ((r[k] || (r[k] = [])).push(v), r), {});

                return Object.values(vendasByDateAndByPeca);
            });

        return (vendasByDateAndByPeca);
    }
}
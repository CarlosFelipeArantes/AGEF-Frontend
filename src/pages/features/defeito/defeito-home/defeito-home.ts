import { Events, IonicPage, Loading, ModalController, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { DialogoProvider } from "../../../../injectables/dialogo";
import { LoadingProvider } from "../../../../injectables/loading";
import { DefeitoService } from '../../../../services/domain/defeito.service';
import { DefeitoDTO } from '../../../../models/defeito.dto';

@IonicPage()
@Component({
    selector: 'page-defeito-home',
    templateUrl: 'defeito-home.html',
})
export class DefeitoHomePage {

    loading: Loading;
    loadingEstaPresente: boolean = true;
    defeitos: DefeitoDTO[];
    defeitosAgrupadosPorPeca: any;

    constructor(
        public dialogo: DialogoProvider,
        public events: Events,
        public loaderProvider: LoadingProvider,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public defeitoService: DefeitoService) {
    }


    ionViewWillEnter() {
        this.recuperarDadosDefeitos();
    }


    ionViewDidLoad() {
        // Dismiss é feito no *ngFor.
        this.loading = this.loaderProvider.exibirLoadingPadrao("Carregando os defeitos.");
        this.mostrarLoading(true);
    }

    public delete(defeito: DefeitoDTO): void {
        let mensagem: string = 'Você realmente quer apagar esse registro de defeito?';
        let titulo: string = 'Confirmar Remoção';
        let alert = this.dialogo.exibirDialogoConfirmacao(mensagem, titulo);

        alert.present();

        alert.onDidDismiss((confirmado) => {
            if (confirmado) {
                this.loading = this.loaderProvider.exibirLoadingPadrao("Apagando o defeito.");
                this.mostrarLoading(true);

                this.defeitoService.delete(defeito)
                    .subscribe(() => {
                        this.recuperarDadosDefeitos();
                        this.mostrarLoading(false);
                        this.dialogo.exibirToast("Defeito apagado com sucesso.");
                    },
                        error => {
                            // TODO tratar erros
                            console.log(error);
                        })
            }
        });
    }

    public onClickAbrirModalCadastroDefeito(): void {
        let modalDadosDefeito = this.modalCtrl.create('DefeitoInsertPage');

        modalDadosDefeito.present();

        modalDadosDefeito.onDidDismiss(defeituoso => {
            if (defeituoso) {
                this.recuperarDadosDefeitos();
            }
        });
    }

    public recuperarDadosDefeitos(): void {
        this.defeitoService.findAll()
            .subscribe(response => {
                this.defeitos = response;

                if (this.defeitos !== null) {
                    this.defeitosAgrupadosPorPeca = this.agruparDefeitosPorPeca(this.defeitos);

                } else {
                    this.mostrarLoading(false);
                }
            },
                error => {
                    // TODO tratar erros
                    console.log(error);
                });
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

    private agruparDefeitosPorPeca(defeitos: DefeitoDTO[]): any[][] {
        let defeitosPorPeca = defeitos
            .reduce((r, v, i, a, k = (v.pecaFeira.modelo.nome + " - " + v.pecaFeira.modelo.tamanho)) => ((r[k] || (r[k] = []))
                .push(v), r), {});

        return Object.values(defeitosPorPeca);
    }

    public onClickAbrirModalDetalhesDefeitos(defeitos: DefeitoDTO[]): void {
        let modalDetalhesDefeitos = this.modalCtrl.create('DefeitoDetailsPage', defeitos);

        modalDetalhesDefeitos.present();

        modalDetalhesDefeitos.onDidDismiss(needsReload => {
            if (needsReload) {
                this.recuperarDadosDefeitos();
            }
        });
    }
}
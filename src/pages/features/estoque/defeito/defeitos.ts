import {Events, IonicPage, Loading, ModalController, NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {DialogoProvider} from "../../../../injectables/dialogo";
import {LoadingProvider} from "../../../../injectables/loading";
import {DefeitoService} from '../../../../services/domain/defeito.service';
import {DefeitoDTO} from '../../../../models/defeito.dto';

@IonicPage()
@Component({
    selector: 'page-defeitos',
    templateUrl: 'defeitos.html',
})
export class manageDefeitosPage {

    loading: Loading;
    isLoadingDismissed: boolean = true;
    itemExpandHeight: number = 35;
    defeitos: DefeitoDTO[];
    defeitosGroupByDate: any;

    constructor(
        public dialogo: DialogoProvider,
        public events: Events,
        public loaderProvider: LoadingProvider,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public defeitoService: DefeitoService){
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewWillEnter() {
        this.loadDefeitos();
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidLoad() {
        // Dismiss é feito no *ngFor.
        this.loading = this.loaderProvider.exibirLoadingPadrao("Carregando os defeitos.");
        this.presentLoading(true);
    }

    delete(defeito: DefeitoDTO) {
        let mensagem: string = 'Você realmente quer apagar esse registro de defeito?';
        let titulo: string = 'Confirmar Remoção';
        let alert = this.dialogo.exibirDialogoConfirmacao(mensagem, titulo);

        alert.present();

        alert.onDidDismiss((confirmado) => {
            if (confirmado) {
                this.loading = this.loaderProvider.exibirLoadingPadrao("Apagando o defeito.");
                this.presentLoading(true);

                this.defeitoService.delete(defeito)
                    .subscribe(() => {
                            this.loadDefeitos();
                            this.presentLoading(false);
                            this.dialogo.exibirToast("Defeito apagado com sucesso.");
                        },
                        error => {
                            // TODO tratar erros
                            console.log(error);
                        })
            }
        });
    }

    insert() {
        let modalDadosDefeito = this.modalCtrl.create('manageDefeitosPage');

        modalDadosDefeito.present();

        modalDadosDefeito.onDidDismiss(defeituoso => {
            if (defeituoso) {
                this.loadDefeitos();
            }
        });
    }

    loadDefeitos() {
        this.defeitoService.findAll()
            .subscribe(response => {
                    this.defeitos = response;
                    this.defeitosGroupByDate = manageDefeitosPage.splitDefeitoByDate(this.defeitos);
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

    private static splitDefeitoByDate(defeitos: DefeitoDTO[]): any[][] {
        let defeitosByDate = defeitos
            .reduce((r, v, i, a, k = v.data) => ((r[k] || (r[k] = []))
                .push(v), r), {});

        return Object.values(defeitosByDate);
    }

}
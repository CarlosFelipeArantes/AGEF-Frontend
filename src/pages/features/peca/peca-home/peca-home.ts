import {Component} from '@angular/core';
import {AlertController, IonicPage, Loading, ModalController, NavController, NavParams} from 'ionic-angular';
import {PecaFeiraService} from '../../../../services/domain/peca-feira.service';
import {PecaFeiraDTO} from '../../../../models/pecaFeira.dto';
import {UtilsService} from "../../../../services/utils/utils.service";
import {LoadingProvider} from "../../../../injectables/loading";
import {DialogoProvider} from "../../../../injectables/dialogo";

@IonicPage()
@Component({
    selector: 'page-peca-home',
    templateUrl: 'peca-home.html',
})
export class PecaHomePage {

    loadingEstaPresente: boolean = true;
    loading: Loading;
    pecas: PecaFeiraDTO[];

    constructor(
        public alertCtrl: AlertController,
        public dialogoProvider: DialogoProvider,
        public loadingProvider: LoadingProvider,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public pecaFeiraService: PecaFeiraService,
        public utilsService: UtilsService) {
    }

    pecaFeira: PecaFeiraDTO;

    // noinspection JSUnusedGlobalSymbols
    ionViewWillEnter() {
        this.recuperarDadosPecas();
    }

    ionViewDidLoad() {
        // Dismiss é feito no *ngFor.
        this.loading = this.loadingProvider.exibirLoadingPadrao("Carregando as vendas.");
        this.mostrarLoading(true);
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

    public onClickRemoverPeca(pecaFeira: PecaFeiraDTO): void {
        let mensagem: string = 'Você realmente deseja apagar essa peça do estoque?';
        let titulo: string = 'Confirmar Remoção';
        let dialogo = this.dialogoProvider.exibirDialogoConfirmacao(mensagem, titulo);

        dialogo.present();

        dialogo.onDidDismiss((confirmado) => {
            if (confirmado) {
                this.loading = this.loadingProvider.exibirLoadingPadrao("Apagando a peça.");
                this.mostrarLoading(true);

                this.pecaFeiraService.remove(pecaFeira)
                    .subscribe(() => {
                            this.removerPecaDoVetor(pecaFeira);
                            this.mostrarLoading(false);
                            this.dialogoProvider.exibirToast("Venda apagada com sucesso.");
                        },
                        error => {
                            // TODO tratar erros
                            console.log(error);
                        })
            }
        });
    }

    public removerPecaDoVetor(pecaFeira: PecaFeiraDTO): void {
        let indicePeca = this.pecas.indexOf(pecaFeira);
        this.pecas.splice(indicePeca, 1);
    }

    public mascaraDinheiro(valor: number): string {
        return this.utilsService.mascaraDinheiro(valor);
    }

    public onClickAbrirModalCadastroPeca(): void {
        let modalCadastroPeca = this.modalCtrl.create("PecaInsertPage");

        modalCadastroPeca.present();

        modalCadastroPeca.onDidDismiss(cadastrado => {
            if (cadastrado) {
                this.recuperarDadosPecas();
            }
        });
    }

    public onClickAbrirModalEdicaoPeca(peca: PecaFeiraDTO): void {
        let modalEdicaoPeca = this.modalCtrl.create("PecaUpdatePage", peca);

        modalEdicaoPeca.present();

        modalEdicaoPeca.onDidDismiss(editado => {
            if (editado) {
                this.recuperarDadosPecas();
            }
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

}
import {Component} from '@angular/core';
import {IonicPage, Loading, NavController, NavParams, ViewController} from 'ionic-angular';
import {DefeitoDTO} from "../../../../models/defeito.dto";
import {DialogoProvider} from "../../../../injectables/dialogo";
import {LoadingProvider} from "../../../../injectables/loading";
import {UtilsService} from "../../../../services/utils/utils.service";
import {DefeitoService} from "../../../../services/domain/defeito.service";

/**
 * Generated class for the DefeitoDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-defeito-details',
    templateUrl: 'defeito-details.html',
})
export class DefeitoDetailsPage {

    defeitos: DefeitoDTO[];
    defeitosAgrupadosPorData: any[][];
    loadingEstaPresente: boolean = true;
    loading: Loading;
    telaAnteriorDeveAtualizar: boolean = false;

    constructor(
        public dialogoProvider: DialogoProvider,
        public loadingProvider: LoadingProvider,
        public navCtrl: NavController,
        public navParams: NavParams,
        public utilsService: UtilsService,
        public defeitoService: DefeitoService,
        public viewCtrl: ViewController) {

        this.defeitos = this.navParams.data;
    }

    ionViewDidLoad() {
        this.loading = this.loadingProvider.exibirLoadingPadrao("Carregando os defeitos.");
        this.mostrarLoading(true);
    }

    ionViewWillEnter() {
        this.defeitosAgrupadosPorData = this.agruparDefeitosPorData(this.defeitos);
    }

    public agruparDefeitosPorData(defeitos: DefeitoDTO[]): any[][] {
        let defeitosPorData = defeitos
            .reduce((r, v, i, a, k = v.data) => ((r[k] || (r[k] = []))
                .push(v), r), {});

        return Object.values(defeitosPorData);
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

    public onClickFecharModal(): void {
        this.viewCtrl.dismiss(this.telaAnteriorDeveAtualizar);
    }

    public onClickEstornarDefeito(defeito: DefeitoDTO) {
        let mensagem: string = 'Você realmente quer apagar esse registro de defeito?';
        let titulo: string = 'Confirmar Remoção';
        let alert = this.dialogoProvider.exibirDialogoConfirmacao(mensagem, titulo);

        alert.present();

        alert.onDidDismiss((confirmado) => {
            if (confirmado) {
                this.loading = this.loadingProvider.exibirLoadingPadrao("Apagando o defeito.");
                this.mostrarLoading(true);

                this.defeitoService.estornar(defeito)
                    .subscribe(() => {
                            this.recarregarDados(defeito);
                            this.telaAnteriorDeveAtualizar = true;
                            this.mostrarLoading(false);
                            this.dialogoProvider.exibirToast("Defeito apagado com sucesso.");
                        },

                        error => {
                            // TODO tratar erros
                            console.log(error);
                        })
            }
        });
    }

    public recarregarDados(defeito: DefeitoDTO): void {
        if (this.defeitos.length > 1) {
            let indiceDefeito = this.defeitos.indexOf(defeito);
            this.defeitos.splice(indiceDefeito, 1);
            this.defeitosAgrupadosPorData = this.agruparDefeitosPorData(this.defeitos);

        } else {
            this.viewCtrl.dismiss(true);
        }
    }
}

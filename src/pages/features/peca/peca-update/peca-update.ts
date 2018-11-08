import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {PecaFeiraDTO} from "../../../../models/pecaFeira.dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilsService} from "../../../../services/utils/utils.service";
import {LoadingProvider} from "../../../../injectables/loading";
import {PecaFeiraService} from "../../../../services/domain/peca-feira.service";
import {DialogoProvider} from "../../../../injectables/dialogo";

/**
 * Generated class for the PecaUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-peca-update',
    templateUrl: 'peca-update.html',
})
export class PecaUpdatePage {

    formGroup: FormGroup;
    peca: PecaFeiraDTO;

    constructor(
        public dialogoProvider: DialogoProvider,
        public formBuilder: FormBuilder,
        public loadingProvider: LoadingProvider,
        public pecaFeiraService: PecaFeiraService,
        public navCtrl: NavController,
        public navParams: NavParams,
        public utilsService: UtilsService,
        public viewCtrl: ViewController) {

        this.peca = this.navParams.data;

        this.formGroup = this.formBuilder.group({
            preco: [this.utilsService.mascaraDinheiro(this.peca.preco), [Validators.required]],
            quantidade: [this.peca.quantidade, [Validators.required, Validators.min(1)]]
        })
    }

    public atualizarPeca(): void {
        let preco: number = this.formGroup.controls.preco.value;
        let quantidade: number = this.formGroup.controls.quantidade.value;

        this.peca.quantidade = quantidade;
        this.peca.preco = +this.utilsService.trocarPontuacaoPreco(preco.toString());

        let loading = this.loadingProvider.exibirLoadingPadrao("Atualizando a peça no estoque");
        loading.present();

        this.pecaFeiraService.update(this.peca)
            .subscribe(() => {
                    loading.dismiss();
                    this.dialogoProvider.exibirToast("Peça atualizada com sucesso.");
                    this.viewCtrl.dismiss(true);
                },

                error => {
                    //TODO-Urgente tratar erro
                    loading.dismiss();
                    this.dialogoProvider.exibirToast("Algo deu errado.");
                    console.log(error);
                })
    }

    public onClickFecharModal(): void {
        this.viewCtrl.dismiss(false);
    }
}

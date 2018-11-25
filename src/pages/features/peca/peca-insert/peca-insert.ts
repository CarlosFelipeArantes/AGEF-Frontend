import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {ModeloService} from '../../../../services/domain/modelo.service';
import {PecaFeiraService} from '../../../../services/domain/peca-feira.service';
import {ModeloDTO} from '../../../../models/modelo.dto';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingProvider} from "../../../../injectables/loading";
import {DialogoProvider} from "../../../../injectables/dialogo";
import {UtilsService} from "../../../../services/utils/utils.service";

@IonicPage()
@Component({
    selector: 'page-modelo-home',
    templateUrl: 'peca-insert.html',
})
export class PecaInsertPage {

    formGroup: FormGroup;
    modelos: ModeloDTO[];

    constructor(
        public dialogoProvider: DialogoProvider,
        public formBuilder: FormBuilder,
        public loadingProvider: LoadingProvider,
        public modeloService: ModeloService,
        public navCtrl: NavController,
        public navParams: NavParams,
        public pecaFeiraService: PecaFeiraService,
        public utilsService: UtilsService,
        public viewCtrl: ViewController) {

        this.formGroup = this.formBuilder.group({
            modelo: [null, [Validators.required]],
            preco: [null, [Validators.required]],
            quantidade: [1, [Validators.required, Validators.min(1)]]
        })
    }

    
    ionViewWillEnter() {
        this.recuperarModelos();
    }

    public recuperarModelos(): void {
        this.modeloService.findAll()
            .subscribe(response => {
                    this.modelos = response;
                },

                //TODO tratar erros
                error => {
                    console.log(error);
                });
    }

    public persistirPeca(): void {
        let modelo: string = this.formGroup.controls.modelo.value;
        let preco: string = this.formGroup.controls.preco.value;
        let quantidade: string = this.formGroup.controls.quantidade.value;

        let peca: any = {
            modelo: modelo,
            preco: this.utilsService.trocarPontuacaoPreco(preco),
            quantidade: quantidade
        };

        let loading = this.loadingProvider.exibirLoadingPadrao("Cadastrando a peça no estoque");
        loading.present();

        this.pecaFeiraService.save(peca)
            .subscribe(() => {
                    loading.dismiss();
                    this.dialogoProvider.exibirToast("Peça cadastrada com sucesso.");
                    this.viewCtrl.dismiss(true);
                },

                error => {
                    loading.dismiss();
                    this.dialogoProvider.exibirToast("Já existe uma peça cadastrada com esse modelo.");
                    console.log(error);
                })
    }

    public onClickFecharModal(): void {
        this.viewCtrl.dismiss(false);
    }

}

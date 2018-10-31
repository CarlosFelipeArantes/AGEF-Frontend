import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Component} from '@angular/core';
import {DialogoProvider} from "../../../../injectables/dialogo";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingProvider} from "../../../../injectables/loading";
import {PecaFeiraService} from '../../../../services/domain/peca-feira.service';
import {PecaFeiraDTO} from "../../../../models/pecaFeiraDTO";
import {DatePipe} from "@angular/common";
import {VendaService} from "../../../../services/domain/venda.service";

@IonicPage()
@Component({
    selector: 'page-venda-insert',
    templateUrl: 'modelo-insert.html',
})
export class ModeloInsertPage {

    dataMax: String = new Date().toISOString();
    formGroup: FormGroup;
    pecas: PecaFeiraDTO[];

    constructor(
        public datePipe: DatePipe,
        public dialogo: DialogoProvider,
        public formBuilder: FormBuilder,
        public loaderProvider: LoadingProvider,
        public navCtrl: NavController,
        public navParams: NavParams,
        public pecaFeiraService: PecaFeiraService,
        public vendaService: VendaService,
        public viewCtrl: ViewController) {

        this.formGroup = this.formBuilder.group({
            data: [new Date().toISOString(), [Validators.required]],
            peca: [null, [Validators.required]],
            preco: [null, [Validators.required, Validators.min(0.01)]],
            quantidade: [1, [Validators.required, Validators.min(1)]]
        })
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewWillEnter() {
        this.loadPecas();
    }

    decrement() {
        let qtdAtual = this.formGroup.controls.quantidade.value;

        if (qtdAtual > 1) {
            this.formGroup.controls.quantidade.setValue(--qtdAtual);
        }
    }

    increment() {
        let qtdAtual = this.formGroup.controls.quantidade.value;

        this.formGroup.controls.quantidade.setValue(++qtdAtual);
    }

    insert() {
        let data = this.formGroup.controls.data.value;
        let peca = this.formGroup.controls.peca.value;
        let preco = this.formGroup.controls.preco.value;
        let quantidade = this.formGroup.controls.quantidade.value;
        let venda: any = {
            data: this.datePipe.transform(data, 'dd/MM/yyyy'),
            pecaFeira: peca,
            preco: preco,
            quantidade: quantidade
        };

        let loader = this.loaderProvider.exibirLoadingPadrao("Registrando a venda");
        loader.present();

        this.vendaService.insert(venda)
            .subscribe(() => {
                    loader.dismiss();
                    this.dialogo.exibirToast("Venda registrada com sucesso.");
                    this.viewCtrl.dismiss(true);
                },
                error => {
                    if (error.status === 400) {
                        loader.dismiss();

                        let mensagem = "A quantidade de peças vendidas deve ser menor ou igual a quantidade de peças no estoque";
                        let titulo = "Erro";

                        this.dialogo.exibirDialogoInformacao(mensagem, titulo);
                    }

                    console.log(error);
                })
    }

    loadPecas() {
        this.pecaFeiraService.findAll()
            .subscribe(pecas => {
                    this.pecas = pecas;
                },
                error => {
                    //TODO tratar erros
                    console.log(error);
                })
    }

    onClickDismissModal() {
        this.viewCtrl.dismiss(false);
    }

    onSelectChangeUpdatePreco(peca: PecaFeiraDTO) {
        let preco = peca.preco;

        this.formGroup.controls.preco.setValue(preco);
    }
}

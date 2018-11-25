import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Component} from '@angular/core';
import {DialogoProvider} from "../../../../injectables/dialogo";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingProvider} from "../../../../injectables/loading";
import {DatePipe} from "@angular/common";
import {ModeloService} from "../../../../services/domain/modelo.service";
import { ModeloDTO } from '../../../../models/modelo.dto';

@IonicPage()
@Component({
    selector: 'page-modelo-insert',
    templateUrl: 'modelo-insert.html',
})
export class ModeloInsertPage {

    formGroup: FormGroup;
    modelos: ModeloDTO[];

    constructor(
        public datePipe: DatePipe,
        public dialogo: DialogoProvider,
        public formBuilder: FormBuilder,
        public loaderProvider: LoadingProvider,
        public navCtrl: NavController,
        public navParams: NavParams,
        public modeloService: ModeloService,
        public viewCtrl: ViewController) {

        this.formGroup = this.formBuilder.group({
            modelo: [null, [Validators.required]],
            tamanho: [null, [Validators.required]]
        })
    }

    
    ionViewWillEnter() {
        this.loadModelos();
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
        let nome = this.formGroup.controls.modelo.value;
        let tamanho = this.formGroup.controls.tamanho.value;
        let modelo: any = {
            nome: nome,
            tamanho: tamanho,
        };

        let loader = this.loaderProvider.exibirLoadingPadrao("Salvando modelo");
        loader.present();

        this.modeloService.save(modelo)
            .subscribe(() => {
                    loader.dismiss();
                    this.dialogo.exibirToast("Modelo salvo com sucesso.");
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

    loadModelos() {
        this.modeloService.findAll()
            .subscribe(modelos => {
                    this.modelos = modelos;
                },
                error => {
                    //TODO tratar erros
                    console.log(error);
                })
    }

    onClickDismissModal() {
        this.viewCtrl.dismiss(false);
    }

}

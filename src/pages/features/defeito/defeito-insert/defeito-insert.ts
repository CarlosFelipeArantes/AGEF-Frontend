import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Component} from '@angular/core';
import {DialogoProvider} from "../../../../injectables/dialogo";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingProvider} from "../../../../injectables/loading";
import {PecaFeiraService} from '../../../../services/domain/peca-feira.service';
import {PecaFeiraDTO} from "../../../../models/pecaFeira.dto";
import {DatePipe} from "@angular/common";
import {DefeitoService} from "../../../../services/domain/defeito.service";

@IonicPage()
@Component({
    selector: 'page-defeito-insert',
    templateUrl: 'defeito-insert.html',
})
export class DefeitoInsertPage {

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
        public defeitoService: DefeitoService,
        public viewCtrl: ViewController) {

        this.formGroup = this.formBuilder.group({
            data: [new Date().toISOString(), [Validators.required]],
            peca: [null, [Validators.required]],
            quantidade: [1, [Validators.required, Validators.min(1)]]
        })
    }

    
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
        let quantidade = this.formGroup.controls.quantidade.value;
        let defeito: any = {
            data: this.datePipe.transform(data, 'dd/MM/yyyy'),
            pecaFeira: peca,
            quantidade: quantidade
        };

        let loader = this.loaderProvider.exibirLoadingPadrao("Registrando o defeito");
        loader.present();

        this.defeitoService.insert(defeito)
            .subscribe(() => {
                    loader.dismiss();
                    this.dialogo.exibirToast("Defeito registrado com sucesso.");
                    this.viewCtrl.dismiss(true);
                },
                error => {
                    if (error.status === 400) {
                        loader.dismiss();

                        let mensagem = "A quantidade de peças com defeito deve ser menor ou igual a quantidade de peças no estoque";
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

    onClickFecharModal() {
        this.viewCtrl.dismiss(false);
    }
}

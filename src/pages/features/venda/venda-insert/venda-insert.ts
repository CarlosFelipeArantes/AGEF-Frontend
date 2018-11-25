import { API_CONFIG } from "../../../../config/api.config";
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { DialogoProvider } from "../../../../injectables/dialogo";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoadingProvider } from "../../../../injectables/loading";
import { PecaFeiraService } from '../../../../services/domain/peca-feira.service';
import { PecaFeiraDTO } from "../../../../models/pecaFeira.dto";
import { MensagemDTO } from "../../../../models/mensagem.dto";
import { DatePipe } from "@angular/common";
import { VendaService } from "../../../../services/domain/venda.service";
import { UtilsService } from "../../../../services/utils/utils.service";
import { Socket } from 'ng-socket-io';

@IonicPage()
@Component({
    selector: 'page-venda-insert',
    templateUrl: 'venda-insert.html',
})
export class VendaInsertPage {

    dataMax: String = new Date().toISOString();
    formGroup: FormGroup;
    pecas: PecaFeiraDTO[];

    constructor(
        public datePipe: DatePipe,
        public dialogoProvider: DialogoProvider,
        public formBuilder: FormBuilder,
        public loadingProvider: LoadingProvider,
        public navCtrl: NavController,
        public navParams: NavParams,
        public pecaFeiraService: PecaFeiraService,
        public utilsService: UtilsService,
        public vendaService: VendaService,
        public viewCtrl: ViewController,
        private socket: Socket) {

        this.formGroup = this.formBuilder.group({
            data: [new Date().toISOString(), [Validators.required]],
            peca: [null, [Validators.required]],
            preco: [null, [Validators.required]],
            quantidade: [1, [Validators.required, Validators.min(1)]]
        })
    }

    
    ionViewWillEnter() {
        this.loadPecas();
    }

    ionViewWillLeave() {
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
        let data: string = this.formGroup.controls.data.value;
        let peca: string = this.formGroup.controls.peca.value;
        let preco: string = this.formGroup.controls.preco.value;
        let quantidade: string = this.formGroup.controls.quantidade.value;

        let venda: any = {
            data: this.datePipe.transform(data, 'dd/MM/yyyy'),
            pecaFeira: peca,
            preco: this.utilsService.trocarPontuacaoPreco(preco),
            quantidade: quantidade
        };

        let loading = this.loadingProvider.exibirLoadingPadrao("Registrando a venda");
        loading.present();

        this.vendaService.insert(venda)
            .subscribe(() => {
                loading.dismiss();
                this.dialogoProvider.exibirToast("Venda registrada com sucesso.");
                this.viewCtrl.dismiss(true);
                let mensagem: MensagemDTO = {
                    baseUrl: API_CONFIG.baseUrl,
                    operacao: "venda",
                    venda: venda
                };

                this.socket.emit('vendi', mensagem);
            },
                error => {
                    if (error.status === 400) {
                        loading.dismiss();

                        let mensagem = "A quantidade de peças vendidas deve ser menor ou igual a quantidade de peças no estoque";
                        let titulo = "Erro";

                        this.dialogoProvider.exibirDialogoInformacao(mensagem, titulo);
                    }

                    console.log(error);
                })
    }

    loadPecas() {
        this.pecaFeiraService.findAll()
            .subscribe(pecas => {
                this.pecas = pecas;
                this.pecas = this.pecas.filter(peca => peca.quantidade>0);
            },
                error => {
                    //TODO tratar erros
                    console.log(error);
                })
    }

    onClickFecharModal() {
        this.viewCtrl.dismiss(false);
    }

    onSelectChangeUpdatePreco(peca: PecaFeiraDTO) {
        let preco: number = peca.preco;
        let precoMasked = this.utilsService.mascaraDinheiro(preco);

        this.formGroup.controls.preco.setValue(precoMasked);
    }
}

import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {vendaService} from '../../../../services/domain/venda.service';
import {PecaFeiraDTO} from '../../../../models/pecaFeiraDTO';
import {VendaDTO} from '../../../../models/venda.dto';
import {DialogoProvider} from "../../../../injectables/dialogo";

@IonicPage()
@Component({
    selector: 'vendas-visualizar',
    templateUrl: 'vendas.html',
})
export class showVendasPage {

    vendas: VendaDTO[];
    pecaFeira: PecaFeiraDTO;

    constructor(public navCtrl: NavController, public navParams: NavParams, public vendaService: vendaService,
                public events: Events, private dialogo: DialogoProvider) {

        this.events.subscribe('updateScreen', () => {
            this.vendaService.findAll().subscribe(response => {
                    this.vendas = response;
                },
                error => {
                    console.log(error);
                });
        });
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidEnter() {
        this.vendaService.findAll()
            .subscribe(response => {
                    this.vendas = response;
                },
                error => {
                    console.log(error);
                });
    }

    remove(venda: VendaDTO) {
        let mensagem = 'Você realmente quer apagar esse registro de venda?';
        let titulo = 'Confirmar Remoção';
        let alert = this.dialogo.exibirDialogoConfirmacao(mensagem, titulo);

        alert.present();

        alert.onDidDismiss((isConfirmed) => {
            if (isConfirmed) {
                this.vendaService.remove(venda).subscribe(response => {
                        this.events.publish('updateScreen');
                        this.dialogo.exibirToast("Venda apagada com sucesso.");
                    },
                    error => {
                        // TODO tratar possíveis erros
                    })
            }
        });
    }
}
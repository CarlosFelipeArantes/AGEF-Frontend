import {Component} from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {VendaService} from '../../../../services/domain/venda.service';
import {pecaFeiraService} from '../../../../services/domain/pecaFeira.service';
import {PecaFeiraDTO} from '../../../../models/pecaFeiraDTO';
import {VendaDTO} from '../../../../models/venda.dto';

@IonicPage()
@Component({
    selector: 'page-vendas',
    templateUrl: 'venda.html',
})
export class vendaPage {

    items: PecaFeiraDTO[];
    pecaFeira: PecaFeiraDTO;
    venda: VendaDTO;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public pecaFeiraService: pecaFeiraService,
        public vendaService: VendaService,
        private alertCtrl: AlertController,
        public events: Events
    ) {

        this.events.subscribe('updateScreen', () => {
            this.pecaFeiraService.findAll()
                .subscribe(response => {
                        this.items = response;
                    },
                    error => {
                        console.log(error);
                    });
        });

        this.events.subscribe('erroQuantidade', () => {
            let alert = this.alertCtrl.create({
                title: 'Erro na quantidade',
                subTitle: 'Venda com quantidade maior do que no estoque.',
                buttons: ['Continuar']
            });
            alert.present();
        });

        this.events.subscribe('sucessoVenda', () => {
            let alert = this.alertCtrl.create({
                title: 'Venda',
                subTitle: 'Venda registrada com sucesso.',
                buttons: ['Continuar']
            });
            alert.present();
        });
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewDidEnter() {
        this.pecaFeiraService.findAll()
            .subscribe(response => {
                    this.items = response;

                },
                error => {
                    console.log(error);
                });
    }

    // selecionar(pecaFeira: PecaFeiraDTO) {
    //     const DATE: Date = new Date();
    //     let dia, mes, ano;
    //
    //     dia = DATE.getDate();
    //
    //     if (DATE.getMonth().toString.length <= 1) {
    //         mes = '0' + DATE.getMonth();
    //     } else {
    //         mes = DATE.getMonth();
    //     }
    //
    //     ano = DATE.getFullYear();
    //
    //     let alert = this.alert.create({
    //         title: 'Realizar Venda',
    //         message: "Aqui você pode selecionar a quantidade desejada.",
    //         inputs: [
    //             {
    //                 name: 'quantidade',
    //                 placeholder: 'Quantidade'
    //             }
    //         ],
    //         buttons: [
    //             {
    //                 text: 'Cancelar',
    //                 role: 'cancel',
    //                 handler: data => {
    //                     console.log('Cancel clicked');
    //                 }
    //             },
    //             {
    //                 text: 'Confirmar',
    //                 handler: data => {
    //                     this.venda = {
    //                         id: pecaFeira.id,
    //                         nome: pecaFeira.modelo.nome,
    //                         tamanho: pecaFeira.modelo.tamanho,
    //                         preco: pecaFeira.preco,
    //                         quantidade: data.quantidade,
    //                         data: dia + '-' + mes + '-' + ano,
    //                     };
    //                     if (this.venda.quantidade > pecaFeira.quantidade)
    //                         this.events.publish('erroQuantidade');
    //                     else
    //                         this.adicionarVenda(this.venda);
    //                 }
    //             }
    //         ]
    //     });
    //     alert.present();
    // }

    // adicionarVenda(venda: VendaDTO) {
    //     this.vendaService.insert(this.venda)
    //         .subscribe(response => {
    //                 this.events.publish('sucessoVenda');
    //             },
    //             error => {
    //                 console.log(error);
    //             }
    //         );
    // }

}
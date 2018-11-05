import {Component} from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PecaFeiraService} from '../../../../../services/domain/peca-feira.service';
import {PecaFeiraDto} from '../../../../../models/pecaFeira.dto';
import {DefeitoService} from '../../../../../services/domain/defeito.service';
import {DefeitoDTO} from '../../../../../models/defeito.dto';

@IonicPage()
@Component({
    selector: 'page-visualizar',
    templateUrl: 'pecas.html',
})
export class showPecasPage {

    items: PecaFeiraDto[];
    pecaFeira: PecaFeiraDto;
    defeito: DefeitoDTO;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        public pecaFeiraService: PecaFeiraService,
        public defeitoService: DefeitoService,
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

    adicionar(pecaFeira: PecaFeiraDto) {
        const DATE: Date = new Date();
        let dia, mes, ano;

        dia = DATE.getDate();

        if (DATE.getMonth().toString.length <= 1) {
            mes = '0' + DATE.getMonth();
        } else {
            mes = DATE.getMonth();
        }

        ano = DATE.getFullYear();

        let alert = this.alertCtrl.create({
            title: 'Defeito:',
            message: "Aqui você pode registrar a peça defeituosa para: " + pecaFeira.modelo.nome,
            inputs: [
                {
                    name: 'quantidade',
                    placeholder: 'Quantidade'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Confirmar',
                    handler: data => {
                        if (data.quantidade != '') {
                            this.defeito = {
                                id: '',
                                pecaFeira: pecaFeira,
                                quantidade: data.quantidade,
                                data: ano + '-' + dia + '-' + mes,
                            };
                            this.defeitoService.save(this.defeito).subscribe(response => {
                                    this.events.publish('updateScreen');
                                },
                                error => {
                                    if (error.status == '400') {

                                    }
                                });
                        } else {
                            //
                        }
                    }
                }
            ]
        });
        alert.present();


    }

}
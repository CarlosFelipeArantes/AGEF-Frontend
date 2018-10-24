import {Component} from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {pecaFeiraService} from '../../../../services/domain/pecaFeira.service';
import {PecaFeiraDTO} from '../../../../models/pecaFeiraDTO';


@IonicPage()
@Component({
    selector: 'page-visualizar',
    templateUrl: 'visualizar.html',
})
export class EstoquePage {

    items: PecaFeiraDTO[];
    pecaFeira: PecaFeiraDTO;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        public pecaFeiraService: pecaFeiraService,
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

    ionViewDidEnter() {
        this.pecaFeiraService.findAll()
            .subscribe(response => {
                    this.items = response;
                },
                error => {
                    console.log(error);
                });
    }

    remove(pecaFeira: PecaFeiraDTO) {
        this.pecaFeiraService.remove(pecaFeira)
            .subscribe(response => {
                    this.events.publish('updateScreen');
                    let alert = this.alertCtrl.create({
                        title: 'Sucesso',
                        subTitle: 'A peça foi removida com sucesso!',
                        buttons: ['Continuar']
                    });
                    alert.present();
                },
                error => {
                    let alert = this.alertCtrl.create({
                        title: 'Erro',
                        subTitle: 'Não foi possível remover a peça do estoque, pois existe um defeito associado a essa peça.',
                        buttons: ['Continuar']
                    });
                    alert.present();
                });
    }

    edit(pecaFeira: PecaFeiraDTO) {
        let alert = this.alertCtrl.create({
            title: 'Editar:',
            message: "Aqui você pode editar o seu modelo: " + pecaFeira.modelo.nome,
            inputs: [
                {
                    name: 'preco',
                    placeholder: "" + pecaFeira.preco
                },
                {
                    name: 'quantidade',
                    placeholder: "" + pecaFeira.quantidade
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
                        if (data.preco != '')
                            pecaFeira.preco = data.preco;
                        if (data.quantidade != '')
                            pecaFeira.quantidade = data.quantidade;

                        this.pecaFeiraService.update(pecaFeira).subscribe(response => {
                                this.events.publish('updateScreen');
                                let alert = this.alertCtrl.create({
                                    title: 'Sucesso',
                                    subTitle: 'Peça editada com sucesso!',
                                    buttons: ['Continuar']
                                });
                                alert.present();
                            },
                            error => {
                                let alert = this.alertCtrl.create({
                                    title: 'Erro',
                                    subTitle: 'Não foi possível editar a peça.',
                                    buttons: ['Continuar']
                                });
                                alert.present();

                            });
                    }
                }
            ]
        });
        alert.present();


    }

    addEstoque() {
        this.navCtrl.push("AddEstoquePage");
    }

}
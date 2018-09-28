import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModeloService } from '../../../../services/domain/modelo.service';
import { ModeloDTO } from '../../../../models/modelo.dto';
import { Events } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ModalPage } from './modal/modal';

@IonicPage()
@Component({
  selector: 'page-modelos',
  templateUrl: 'adicionar.html',
})
export class AddEstoquePage {

  items: ModeloDTO[];
  modelo: ModeloDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modeloService: ModeloService,
    public events: Events,
    public modalCtrl: ModalController
  ){
      this.events.subscribe('updateScreen', () => {
        this.modeloService.findAll()
            .subscribe( response => {
              this.items = response;
            },
              error => {
                console.log(error);
              });
        });
  }

  ionViewDidLoad() {
    this.modeloService.findAll()
      .subscribe( response => {
        this.items = response;
      },
        error => {
         console.log(error);
        });
  }

  select(modelo: ModeloDTO){
    this.navCtrl.push("ModalPage", {modelo});
  }

}
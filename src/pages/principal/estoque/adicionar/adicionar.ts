import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PecaService } from '../../../../services/domain/peca.service';
import { PecaDTO } from '../../../../models/peca.dto';
import { Events } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ModalPage } from './modal/modal';

@IonicPage()
@Component({
  selector: 'page-pecas',
  templateUrl: 'adicionar.html',
})
export class AddEstoquePage {

  items: PecaDTO[];
  peca: PecaDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pecaService: PecaService,
    public events: Events,
    public modalCtrl: ModalController
  ){
      this.events.subscribe('updateScreen', () => {
        this.pecaService.findAll()
            .subscribe( response => {
              this.items = response;
            },
              error => {
                console.log(error);
              });
        });
  }

  ionViewDidLoad() {
    this.pecaService.findAll()
      .subscribe( response => {
        this.items = response;
      },
        error => {
         console.log(error);
        });
  }

  select(peca: PecaDTO){
    this.navCtrl.push("ModalPage", {peca});
  }

}
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { vendaService } from '../../../../services/domain/venda.service';
import { pecaFeiraDTO } from '../../../../models/pecaFeira.dto';
import { VendaDTO } from '../../../../models/venda.dto';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-vendas',
  templateUrl: 'vendas.html',
})
export class showVendasPage {

  items: VendaDTO[];
  pecaFeira: pecaFeiraDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public vendaService: vendaService,
    public events: Events
  ) {

    this.events.subscribe('updateScreen', () => {
      this.vendaService.findAll()
        .subscribe(response => {
          this.items = response;
        },
          error => {
            console.log(error);
          });
    });
  }

  ionViewDidEnter() {
    this.vendaService.findAll()
      .subscribe(response => {
        this.items = response;
      },
        error => {
          console.log(error);
        });
  }

  remove(venda:VendaDTO){
    this.vendaService.remove(venda)
      .subscribe( response => {
        this.events.publish('updateScreen');
      },
       error => {
         //this.presentToast();
       });
  }

  addEstoque() {
    this.navCtrl.push("AddEstoquePage");
  }

}
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { vendaService } from'../../../../services/domain/venda.service';
import { pecaFeiraService, pecaFeiraService } from'../../../../services/domain/pecaFeira.service';
import { pecaFeiraDTO } from '../../../../models/pecaFeira.dto';
import { Events } from 'ionic-angular';
import { VendaDTO } from '../../../../models/venda.dto';

@IonicPage()
@Component({
  selector: 'page-vendas',
  templateUrl: 'venda.html',
})
export class vendaPage {

  items: VendaDTO[];
  pecaFeira: pecaFeiraDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pecaFeiraService: pecaFeiraService,
    public vendaService: vendaService,
    public events: Events
  ){
      
      this.events.subscribe('updateScreen', () => {
        this.pecaFeiraService.findAll()
            .subscribe( response => {
              //this.items = response;
            },
              error => {
                console.log(error);
              });
        });
  }

  ionViewDidEnter(){
    this.pecaFeiraService.findAll()
    .subscribe( response => {
      //this.items = response;
    },
      error => {
       console.log(error);
      });
  }

  remove(pecaFeira:pecaFeiraDTO){
    this.pecaFeiraService.remove(pecaFeira)
      .subscribe( response => {
        this.events.publish('updateScreen');
      },
       error => {
         //this.presentToast();
       });
  }

  addEstoque(){
    this.navCtrl.push("AddEstoquePage");
  }

}
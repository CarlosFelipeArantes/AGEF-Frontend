import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { pecaFeiraService } from '../../../../services/domain/pecaFeira.service';
import { pecaFeiraDTO } from '../../../../models/pecaFeira.dto';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-visualizar',
  templateUrl: 'visualizar.html',
})
export class showEstoquePage {

  items: pecaFeiraDTO[];
  pecaFeira: pecaFeiraDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pecaFeiraService: pecaFeiraService,
    public events: Events
  ){
      
      this.events.subscribe('updateScreen', () => {
        this.pecaFeiraService.findAll()
            .subscribe( response => {
              this.items = response;
            },
              error => {
                console.log(error);
              });
        });
  }

  ionViewDidLoad() {
    this.pecaFeiraService.findAll()
      .subscribe( response => {
        this.items = response;
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


}
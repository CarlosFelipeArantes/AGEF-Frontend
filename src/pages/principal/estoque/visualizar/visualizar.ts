import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PecaFeiraService } from '../../../../services/domain/pecaFeira.service';
import { PecaFeiraDTO } from '../../../../models/pecaFeira.dto';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-visualizar',
  templateUrl: 'visualizar.html',
})
export class showEstoquePage {

  items: PecaFeiraDTO[];
  pecaFeira: PecaFeiraDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pecaFeiraService: PecaFeiraService,
    public events: Events,
    private toastCtrl: ToastController
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

  remove(pecaFeira:PecaFeiraDTO){
    this.pecaFeiraService.remove(pecaFeira)
      .subscribe( response => {
        this.events.publish('updateScreen');
      },
       error => {
         this.presentToast();
       });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Não é possível remover uma peça que está em estoque.\n Remova primeiro do estoque.',
      showCloseButton: true,
      position: 'middle',
      cssClass: "toast",
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
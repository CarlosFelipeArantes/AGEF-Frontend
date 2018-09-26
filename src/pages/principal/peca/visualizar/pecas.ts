import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PecaService } from '../../../../services/domain/peca.service';
import { PecaDTO } from '../../../../models/peca.dto';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pecas',
  templateUrl: 'pecas.html',
})
export class PecasPage {

  items: PecaDTO[];
  peca: PecaDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pecaService: PecaService,
    public events: Events,
    private toastCtrl: ToastController
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

  remove(peca:PecaDTO){
    this.pecaService.remove(peca)
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
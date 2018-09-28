import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModeloService } from '../../../../services/domain/modelo.service';
import { ModeloDTO } from '../../../../models/modelo.dto';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modelos',
  templateUrl: 'modelos.html',
})
export class ModelosPage {

  items: ModeloDTO[];
  modelo: ModeloDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modeloService: ModeloService,
    public events: Events,
    private toastCtrl: ToastController
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

  remove(modelo:ModeloDTO){
    this.modeloService.remove(modelo)
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
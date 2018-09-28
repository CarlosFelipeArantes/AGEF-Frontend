import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModeloService } from '../../../../services/domain/modelo.service';
import { ModeloDTO } from '../../../../models/modelo.dto';
import { Events } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

;

@IonicPage({ segment: 'visualizar2'})
@Component({
  selector: 'page-modelos2',
  templateUrl: 'modelos.html',
})
export class Modelos2Page {

  items: ModeloDTO[];
  modelo: ModeloDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modeloService: ModeloService,
    public events: Events,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController
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
         this.show400Alert();
       });
  }

  options(item:ModeloDTO){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Editar '+item.nome,
      buttons: [
        {
          text: 'Editar ',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Remover',
          role: 'destructive',
          handler: () => {
            this.remove(item);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  show400Alert() {
    const alert = this.alertCtrl.create({
      title: 'Não foi possível remover!',
      subTitle: 'Remova antes a peça no estoque vinculada a esse modelo.',
      buttons: ['OK']
    });
    alert.present();
  }
}
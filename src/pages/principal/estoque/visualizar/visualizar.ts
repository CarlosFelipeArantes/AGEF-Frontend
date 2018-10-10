import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { pecaFeiraService } from '../../../../services/domain/pecaFeira.service';
import { pecaFeiraDTO } from '../../../../models/pecaFeira.dto';
import { Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


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
    private alertCtrl: AlertController,
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

  ionViewDidEnter(){
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
        if (error.status=='400'){
          
        }
       });
  }

  edit(pecaFeira:pecaFeiraDTO){
    let alert = this.alertCtrl.create({
      title: 'Editar:',
      message: "Aqui você pode editar o seu modelo: " + pecaFeira.modelo.nome,
      inputs: [
        {
          name: 'preco',
          placeholder: ""+pecaFeira.preco
        },
        {
          name: 'quantidade',
          placeholder: ""+pecaFeira.quantidade
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
            if (data.preco!='')
            pecaFeira.preco = data.preco;
          if (data.quantidade!='')
            pecaFeira.quantidade = data.quantidade;
            
            this.pecaFeiraService.update(pecaFeira).
              subscribe( response => {
                this.events.publish('updateScreen');
              },
                error => {
              if (error.status=='400'){
                
              }
             });
          }
        }
      ]
    });
    alert.present();


  }

  addEstoque(){
    this.navCtrl.push("AddEstoquePage");
  }

}
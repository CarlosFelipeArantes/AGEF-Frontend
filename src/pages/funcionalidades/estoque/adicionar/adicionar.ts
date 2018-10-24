import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModeloService } from '../../../../services/domain/modelo.service';
import { pecaFeiraService } from '../../../../services/domain/pecaFeira.service';
import { ModeloDTO } from '../../../../models/modelo.dto';
import { Events } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { pecaFeiraDTO } from '../../../../models/pecaFeira.dto';

@IonicPage()
@Component({
  selector: 'page-modelos',
  templateUrl: 'adicionar.html',
})
export class AddEstoquePage {

  items: ModeloDTO[];
  modelo: ModeloDTO;
  pecaFeira: pecaFeiraDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modeloService: ModeloService,
    public pecaFeiraService: pecaFeiraService,
    public events: Events,
    private alertCtrl: AlertController
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
    this.getPecaFeira(modelo);
  }

  getPecaFeira(modelo:ModeloDTO) {
    this.pecaFeiraService.get(modelo.id)
      .subscribe( response => {
        this.pecaFeira = response;
        this.promptEditAlert(this.pecaFeira);
      },
      error => {
       console.log(error);
      }
    );
  }

  updatePeca(pecaFeira:pecaFeiraDTO){
    this.pecaFeiraService.update(pecaFeira)
      .subscribe( response => {
        },
        error => {
        console.log(error);
        }
      );
  }

  promptEditAlert(pecaFeira:pecaFeiraDTO){
    let alert = this.alertCtrl.create({
      title: 'Editar:',
      message: "Aqui você pode editar os campos preço e quantidade ",
      inputs: [
        {
          name: 'preco',
          placeholder: ''+pecaFeira.preco,
          type: 'number'
        },
        {
          name: 'quantidade',
          placeholder: ''+pecaFeira.quantidade
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
              
            this.updatePeca(pecaFeira);
          }
        }
      ]
    });
    alert.present();
  }
}
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { vendaService } from'../../../../services/domain/venda.service';
import { pecaFeiraService } from'../../../../services/domain/pecaFeira.service';
import { pecaFeiraDTO } from '../../../../models/pecaFeira.dto';
import { Events } from 'ionic-angular';
import { VendaDTO } from '../../../../models/venda.dto';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-vendas',
  templateUrl: 'venda.html',
})
export class vendaPage {

  items: pecaFeiraDTO[];
  pecaFeira: pecaFeiraDTO;
  venda:VendaDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pecaFeiraService: pecaFeiraService,
    public vendaService: vendaService,
    private alertCtrl: AlertController,
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
      this.events.subscribe('erroQuantidade', () => {
        let alert = this.alertCtrl.create({
          title: 'Erro na quantidade',
          subTitle: 'Venda com quantidade maior do que no estoque.',
          buttons: ['Continuar']
        });
        alert.present();
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

  selecionar(pecaFeira:pecaFeiraDTO){
    const DATE:Date = new Date();
    var dia = DATE.getDate();
    var mes = DATE.getDay();
    var ano = DATE.getFullYear();
    let alert = this.alertCtrl.create({
      title: 'Realizar Venda',
      message: "Aqui você pode selecionar a quantidade desejada.",
      inputs: [
        {
          name: 'quantidade',
          placeholder: 'Quantidade'
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
            this.venda = {
              id: pecaFeira.id,
              nome: pecaFeira.modelo.nome,
              tamanho: pecaFeira.modelo.tamanho,
              preco: pecaFeira.preco,
              quantidade: data.quantidade,
              data: dia+'-'+mes+'-'+ano,
            }
            if(this.venda.quantidade>pecaFeira.quantidade)
              this.events.publish('erroQuantidade');
            else
            this.adicionarVenda(this.venda);
          }
        }
      ]
    });
    alert.present(); 
  }

  adicionarVenda(venda:VendaDTO){
    this.vendaService.save(this.venda)
      .subscribe( response => {
        //this.items = response;
      },
      error => {
        console.log(error);
      }
    );
  }

}
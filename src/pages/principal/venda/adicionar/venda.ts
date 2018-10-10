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

  items: pecaFeiraDTO[];
  pecaFeira: pecaFeiraDTO;
  venda:VendaDTO;

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

  selecionar(pecaFeira:pecaFeiraDTO){
    const DATE:Date = new Date();
    var dia = DATE.getDate();
    var mes = DATE.getDay();
    var ano = DATE.getFullYear();
    this.venda = {
      id: pecaFeira.id,
      nome: pecaFeira.modelo.nome,
      tamanho: pecaFeira.modelo.tamanho,
      preco: pecaFeira.preco,
      quantidade: pecaFeira.quantidade,
      data: dia+'-'+mes+'-'+ano,
    }
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
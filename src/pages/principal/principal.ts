import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { Network } from '@ionic-native/network';
import { AlertController } from 'ionic-angular';
import { vendaService } from '../../services/domain/venda.service';


@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html'
})
export class PrincipalPage {

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    private network: Network,
    private alertCtrl: AlertController,
    private vendaService: vendaService
    ){
 
  }
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  modelos(){
    this.navCtrl.push("ModelosPage");
  }

  visualizarEstoque(){
    this.navCtrl.push("showEstoquePage");
  }

  visualizarVendas(){
    this.navCtrl.push("showVendasPage");
  }

  realizarVenda(){
    this.navCtrl.push("vendaPage");
  }

  faturamento(){
    let alert = this.alertCtrl.create({
      title: 'Faturamento:',
      message: "Selecione o período desejado em formato DD-MM-ANO:",
      inputs: [
        {
          name: 'inicio',
          placeholder: 'Início: DD-MM-ANO'
        },
        {
          name: 'fim',
          placeholder: 'Fim: DD-MM-ANO'
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
            var inicio:String = data.inicio;
            var fim :String= data.fim;
            this.vendaService.getFaturamento(inicio,fim)
              .subscribe( response => {
                let alert = this.alertCtrl.create({
                  title: 'Faturamento',
                  subTitle: 'O faturamento do período selecionado foi de: R$' + response,
                  buttons: ['OK']
                });
                alert.present();
              },
              error => {
                console.log(error);
              });
          }
        }
      ]
    });
    alert.present();
  }

  defeito(){
  }
}

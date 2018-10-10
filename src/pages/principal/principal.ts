import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html'
})
export class PrincipalPage {

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    private network: Network
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
    this.navCtrl.push("vendaPage");
  }
}

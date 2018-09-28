import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html'
})
export class PrincipalPage {

  constructor(public navCtrl: NavController, public menu: MenuController) {
 
  }
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
  
  cadastrar(){
    this.navCtrl.push("CadastrarPage");
  }

  modelos(){
    this.navCtrl.push("ModelosPage");
  }
  modelos2(){
    this.navCtrl.push("Modelos2Page");
  }

  addEstoque(){
    this.navCtrl.push("AddEstoquePage");
  }

  visualizarEstoque(){
    this.navCtrl.push("showEstoquePage");
  }
}

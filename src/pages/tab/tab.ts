import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'tab.html'
})
export class TabPage {

  tab0Root: any = 'PrincipalPage';
  tab1Root: any = 'EstoquePage';
  tab2Root: any = 'ModelosPage';
  tab3Root: any = 'ModelosPage';
  tab4Root: any = 'manageDefeitosPage';
  myIndex:number= 2;

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }
  ionViewWillEnter() {
    this.navCtrl.resize();
  }


  login(){

    //this.navCtrl.push("PrincipalPage");

  }
}

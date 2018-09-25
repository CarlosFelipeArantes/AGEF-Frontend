import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PecaService } from '../../../services/domain/peca.service';
import { PecaDTO } from '../../../models/peca.dto';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pecas',
  templateUrl: 'pecas.html',
})
export class PecasPage {

  items: PecaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pecaService: PecaService){
  }

  ionViewDidLoad() {
    this.pecaService.findAll()
      .subscribe( response => {
        this.items = response;
      },
       error => {
         console.log(error);
       });
  }

}

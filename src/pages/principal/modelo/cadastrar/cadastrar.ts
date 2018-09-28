import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModeloService } from '../../../../services/domain/modelo.service';
import { ModeloDTO } from '../../../../models/modelo.dto';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastrar',
  templateUrl: 'cadastrar.html',
})
export class CadastrarPage {

  modelo: ModeloDTO = {
    id: '',
    nome: '',
    tamanho: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modeloService: ModeloService){
  }

  confirmar(){
    if(this.modelo.nome.valueOf()!='' && this.modelo.tamanho.valueOf()!='' )
      this.modeloService.save(this.modelo)
        .subscribe(response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
}

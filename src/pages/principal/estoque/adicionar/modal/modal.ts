import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PecaFeiraService } from '../../../../../services/domain/pecaFeira.service';
import { PecaDTO } from '../../../../../models/peca.dto';
import { PecaFeiraDTO } from '../../../../../models/pecaFeira.dto';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  peca: PecaDTO;
  pecaFeira: PecaFeiraDTO = {
    id: '',
    peca: {
      id: '',
      nome: '',
      tamanho: ''
    },
    preco: 0,
    quantidade: 0
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pecaFeiraService: PecaFeiraService) {
    this.peca = navParams.get('peca');
    this.pecaFeira.peca=this.peca;
  }

  confirmar() {
      this.pecaFeiraService.save(this.pecaFeira)
        .subscribe(response => {
          console.log(response);
        },
          error => {
            console.log(error);
          }
        );
  }

}

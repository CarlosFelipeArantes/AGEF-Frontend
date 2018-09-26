import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PecaService } from '../../../../../services/domain/peca.service';
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
    public pecaService: PecaService) {
    this.peca = navParams.get('peca');
  }

  confirmar() {
    //if (this.peca.nome.valueOf() != '' && this.peca.tamanho.valueOf() != '')
      this.pecaService.save(this.peca)
        .subscribe(response => {
          console.log(response);
        },
          error => {
            console.log(error);
          }
        );
  }

}

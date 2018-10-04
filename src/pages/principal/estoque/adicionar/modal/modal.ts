import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { pecaFeiraService } from '../../../../../services/domain/pecaFeira.service';
import { ModeloDTO } from '../../../../../models/modelo.dto';
import { pecaFeiraDTO } from '../../../../../models/pecaFeira.dto';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  modelo: ModeloDTO;
  pecaFeira: pecaFeiraDTO = {
    id: '',
    modelo: {
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
    public pecaFeiraService: pecaFeiraService) {
    this.modelo = navParams.get('modelo');
    this.pecaFeira.modelo=this.modelo;
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

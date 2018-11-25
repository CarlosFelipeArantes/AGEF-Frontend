import { LoadingController } from 'ionic-angular';
import { Injectable } from "@angular/core";

@Injectable()
export class LoadingProvider {

    constructor(
        public loadingCtrl: LoadingController) {
    }

    exibirLoadingPadrao(mensagem: string) {
        return this.loadingCtrl.create({
            content: mensagem,
            spinner: 'circles'
        });
    }
}
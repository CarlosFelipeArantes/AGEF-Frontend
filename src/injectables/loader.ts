import {LoadingController} from 'ionic-angular';
import {Injectable} from "@angular/core";

@Injectable()
export class LoaderProvider {

    constructor(
        private loadingCtrl: LoadingController) {
    }

    exibirLoaderPadrao(mensagem: string) {
        return this.loadingCtrl.create({
            content: mensagem,
            spinner: 'circles'
        });
    }
}
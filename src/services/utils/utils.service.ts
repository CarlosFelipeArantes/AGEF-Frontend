import {Injectable} from '@angular/core';
import {BrMaskerIonicServices3} from 'brmasker-ionic-3';

@Injectable()
export class UtilsService {

    constructor(private brMasker: BrMaskerIonicServices3) {
    }

    public estaVazio(obj: any): boolean {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    public mascaraDinheiro(valor: number): string {
        let valorStr: string = valor.toFixed(2);

        return this.brMasker.writeValueMoney(valorStr);
    }

    public trocarPontuacaoPreco(valor: string): string {
        return valor
            .replace(".", "")
            .replace(",", ".");
    }
}
import {Injectable} from '@angular/core';
import {BrMaskerIonicServices3} from 'brmasker-ionic-3';

@Injectable()
export class UtilsService {

    constructor(private brMasker: BrMaskerIonicServices3) {
    }

    mascaraDinheiro(valor: number): string {
        let valorStr: string = valor.toString();

        if (this.precisao(valor) === 0) {
            valorStr += ".00"

        } else if (this.precisao(valor) === 1) {
            valorStr += ".0";
        }

        return this.brMasker.writeValueMoney(valorStr);
    }

    trocarPontuacaoPreco(valor: string): string {
        return valor
            .replace(".", "")
            .replace(",", ".");
    }

    precisao(a: number): number {
        if (!isFinite(a)) return 0;
        let e = 1, p = 0;

        while (Math.round(a * e) / e !== a) {
            e *= 10;
            p++;
        }

        return p;
    }
}
import {VendaDTO} from "./venda.dto";

export interface MensagemDTO {
    venda: VendaDTO,
    operacao: string;
    url: string;
}
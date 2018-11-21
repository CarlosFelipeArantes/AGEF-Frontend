import { VendaDTO } from "./venda.dto";

export interface MensagemDTO {
    baseUrl: string;
    venda: VendaDTO;
    operacao: string;
}
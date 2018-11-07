import {PecaFeiraDTO} from "./pecaFeira.dto";

export interface VendaDTO {
    id: string,
    data: string;
    pecaFeira: PecaFeiraDTO;
    preco: number;
    quantidade: number;
}
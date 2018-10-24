import {PecaFeiraDTO} from "./pecaFeiraDTO";

export interface VendaDTO {
    id: string,
    data: string;
    pecaFeira: PecaFeiraDTO;
    preco: number;
    quantidade: number;
}
import {PecaFeiraDTO} from "./pecaFeiraDTO";

export interface VendaDTO {
    id: string,
    data: string;
    expanded: boolean;
    pecaFeira: PecaFeiraDTO;
    preco: number;
    quantidade: number;
}
import {PecaFeiraDto} from "./pecaFeira.dto";

export interface VendaDTO {
    id: string,
    data: string;
    expanded: boolean;
    pecaFeira: PecaFeiraDto;
    preco: number;
    quantidade: number;
}
import { PecaDTO } from "./peca.dto";

export interface PecaFeiraDTO {
    id: string;
    peca: PecaDTO;
    preco: number;
    quantidade: number;
}
import {ModeloDTO} from "./modelo.dto";

export interface PecaFeiraDTO {
    id: string;
    modelo: ModeloDTO;
    preco: number;
    quantidade: number;
}
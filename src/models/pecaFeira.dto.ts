import {ModeloDTO} from "./modelo.dto";

export interface PecaFeiraDto {
    id: string;
    modelo: ModeloDTO;
    preco: number;
    quantidade: number;
}
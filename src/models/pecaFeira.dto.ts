import { ModeloDTO } from "./modelo.dto";

export interface pecaFeiraDTO {
    id: string;
    modelo: ModeloDTO;
    preco: number;
    quantidade: number;
}
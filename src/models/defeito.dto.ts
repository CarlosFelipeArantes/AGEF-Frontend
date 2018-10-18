import { pecaFeiraDTO } from "./pecaFeira.dto";

export interface DefeitoDTO {
    id: string;
    pecaFeira:pecaFeiraDTO
    data: string;
    quantidade: number;
}
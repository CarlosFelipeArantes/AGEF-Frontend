import { pecaFeiraDTO } from "./pecaFeira.dto";

export interface DefeitoDTO {
    id: string;
    peca:pecaFeiraDTO
    data: string;
    quantidade: number;
}
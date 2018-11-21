import { PecaFeiraDTO } from "./pecaFeira.dto";

export interface DefeitoDTO {
    id: string;
    pecaFeira: PecaFeiraDTO;
    data: string;
    quantidade: number;
}
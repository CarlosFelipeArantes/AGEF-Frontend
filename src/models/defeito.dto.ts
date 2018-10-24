import {PecaFeiraDTO} from "./pecaFeiraDTO";

export interface DefeitoDTO {
    id: string;
    pecaFeira: PecaFeiraDTO
    data: string;
    quantidade: number;
}
import {PecaFeiraDto} from "./pecaFeira.dto";

export interface DefeitoDTO {
    id: string;
    pecaFeira: PecaFeiraDto
    data: string;
    quantidade: number;
}
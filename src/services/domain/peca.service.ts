import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { PecaDTO } from "../../models/peca.dto";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class PecaService{

    constructor ( public http: HttpClient ){
    } 

    findAll() : Observable<PecaDTO[]> {
        return this.http.get<PecaDTO[]>(`${API_CONFIG.baseUrl}/peca/listar`);
    }
    save( argumento : string ){
        return this.http.get<PecaDTO[]>(`${API_CONFIG.baseUrl}/peca/${argumento.valueOf}`);
    }
    remove(){
        return this.http.get<PecaDTO[]>(`${API_CONFIG.baseUrl}/peca/remover`);
    }

}
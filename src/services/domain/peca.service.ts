import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { PecaDTO } from "../../models/peca.dto";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class PecaService{

    public name: string;
    public tamanho: string;
    public headers : HttpHeaders;


    constructor ( public http: HttpClient ){
    } 

    findAll() : Observable<PecaDTO[]> {
        return this.http.get<PecaDTO[]>(`${API_CONFIG.baseUrl}/peca/listar`);
    }
    save(peca:PecaDTO){
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.post(`${API_CONFIG.baseUrl}/peca/adicionar`, peca,{headers:this.headers});
    }
    remove(peca:PecaDTO){
        return this.http.delete(`${API_CONFIG.baseUrl}/peca/remover/${peca.id}`,{});
    }

}
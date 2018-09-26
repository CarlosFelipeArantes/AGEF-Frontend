import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { PecaFeiraDTO } from "../../models/pecaFeira.dto";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class PecaFeiraService{

    public headers : HttpHeaders;

    constructor ( public http: HttpClient ){
    } 

    findAll() : Observable<PecaFeiraDTO[]> {
        return this.http.get<PecaFeiraDTO[]>(`${API_CONFIG.baseUrl}/pecaFeira/listar`);
    }
    save(pecaFeira:PecaFeiraDTO){
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.post(`${API_CONFIG.baseUrl}/pecaFeira/adicionar`, pecaFeira,{headers:this.headers});
    }
    remove(peca:PecaFeiraDTO){
        return this.http.delete(`${API_CONFIG.baseUrl}/pecaFeira/remover/${peca.id}`,{});
    }

}
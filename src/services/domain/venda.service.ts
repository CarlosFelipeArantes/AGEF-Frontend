import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { VendaDTO } from "../../models/venda.dto";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class vendaService{

    public headers : HttpHeaders;

    constructor ( public http: HttpClient ){
    } 

    findAll() : Observable<VendaDTO[]> {
        return this.http.get<VendaDTO[]>(`${API_CONFIG.baseUrl}/vendas/`);
    }
    save(venda:VendaDTO){
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.post(`${API_CONFIG.baseUrl}/vendas/`, venda,{headers:this.headers});
    }
    remove(venda:VendaDTO){
        return this.http.delete(`${API_CONFIG.baseUrl}/vendas/${venda.id}`,{});
    }

    get(venda:string){
        return this.http.get<VendaDTO>(`${API_CONFIG.baseUrl}/vendas/${venda}`,{});
    }

    update(venda:VendaDTO){
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.put(`${API_CONFIG.baseUrl}/vendas/${venda.id}`, venda,{headers:this.headers});
    }

}
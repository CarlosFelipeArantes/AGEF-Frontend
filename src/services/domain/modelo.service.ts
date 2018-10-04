import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ModeloDTO } from "../../models/modelo.dto";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class ModeloService{

    public name: string;
    public tamanho: string;
    public headers : HttpHeaders;


    constructor ( public http: HttpClient ){
    } 

    findAll() : Observable<ModeloDTO[]> {
        return this.http.get<ModeloDTO[]>(`${API_CONFIG.baseUrl}/modelo/`);
    }
    save(modelo:ModeloDTO){
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.post(`${API_CONFIG.baseUrl}/modelo/`, modelo,{headers:this.headers});
    }
    remove(modelo:ModeloDTO){
        return this.http.delete(`${API_CONFIG.baseUrl}/modelo/${modelo.id}`,{});
    }
    update(modelo:ModeloDTO){
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.put(`${API_CONFIG.baseUrl}/modelo/`+modelo.id, modelo,{headers:this.headers});
    }

}
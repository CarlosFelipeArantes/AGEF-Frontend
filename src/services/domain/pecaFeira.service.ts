import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { pecaFeiraDTO } from "../../models/pecaFeira.dto";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class pecaFeiraService{

    public headers : HttpHeaders;

    constructor ( public http: HttpClient ){
    } 

    findAll() : Observable<pecaFeiraDTO[]> {
        return this.http.get<pecaFeiraDTO[]>(`${API_CONFIG.baseUrl}/pecasfeira/`);
    }
    save(pecaFeira:pecaFeiraDTO){
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.post(`${API_CONFIG.baseUrl}/pecasfeira/`, pecaFeira,{headers:this.headers});
    }
    remove(pecaFeira:pecaFeiraDTO){
        return this.http.delete(`${API_CONFIG.baseUrl}/pecasfeira/${pecaFeira.id}`,{});
    }

    get(pecaFeira:string){
        return this.http.get<pecaFeiraDTO>(`${API_CONFIG.baseUrl}/pecasfeira/${pecaFeira}`,{});
    }

    update(pecaFeira:pecaFeiraDTO){
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.put(`${API_CONFIG.baseUrl}/pecasfeira/${pecaFeira.id}`, pecaFeira,{headers:this.headers});
    }

}
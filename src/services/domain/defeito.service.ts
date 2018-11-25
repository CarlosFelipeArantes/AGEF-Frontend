import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { DefeitoDTO } from "../../models/defeito.dto";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/timeout';

@Injectable()
export class DefeitoService {

    public headers: HttpHeaders;

    constructor(public http: HttpClient) {
    }

    findAll(): Observable<DefeitoDTO[]> {
        return this.http.get<DefeitoDTO[]>(`${API_CONFIG.baseUrl}/defeitos/`)
            .retryWhen(error => error.delay(500))
            .timeout(2000);
    }

    insert(defeito: DefeitoDTO) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.post(`${API_CONFIG.baseUrl}/defeitos/`, defeito, { headers: this.headers });
    }

    delete(defeito: DefeitoDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/defeitos/${defeito.id}`, {});
    }

    estornar(defeito: DefeitoDTO) {
        return this.http.put(`${API_CONFIG.baseUrl}/defeitos/${defeito.id}/estornar/${defeito.pecaFeira.id}`, {});
    }

    findOne(defeito: string) {
        return this.http.get<DefeitoDTO>(`${API_CONFIG.baseUrl}/defeitos/${defeito}`, {})
            .retryWhen(error => error.delay(500))
            .timeout(2000);
    }

    findByDateBetween(inicio, fim) {
        return this.http.get<DefeitoDTO>(`${API_CONFIG.baseUrl}/defeitos/?dataInicial=${inicio}&dataFinal=${fim}`, {})
            .retryWhen(error => error.delay(500))
            .timeout(2000);
    }

    update(defeito: DefeitoDTO) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.put(`${API_CONFIG.baseUrl}/defeitos/${defeito.id}`, defeito, { headers: this.headers });
    }

}
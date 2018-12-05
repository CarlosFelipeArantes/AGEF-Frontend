import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { PecaFeiraDTO } from "../../models/pecaFeira.dto";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/timeout';

@Injectable()
export class PecaFeiraService {

    public headers: HttpHeaders;

    constructor(public http: HttpClient) {
    }

    findAll(): Observable<PecaFeiraDTO[]> {
        return this.http.get<PecaFeiraDTO[]>(`${API_CONFIG.baseUrl}/pecasfeira/`)
        .timeout(3000)
        .retryWhen(error => error.delay(1000)
        .take(50)
        );
    }

    save(pecaFeira: PecaFeiraDTO) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.post(`${API_CONFIG.baseUrl}/pecasfeira/`, pecaFeira, { headers: this.headers });
    }

    remove(pecaFeira: PecaFeiraDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/pecasfeira/${pecaFeira.id}`, {})
        .timeout(3000)
        .retryWhen(error => error.delay(1000)
        .take(50)
        );
    }

    get(pecaFeira: string) {
        return this.http.get<PecaFeiraDTO>(`${API_CONFIG.baseUrl}/pecasfeira/${pecaFeira}`)
            .timeout(3000)
            .retryWhen(error => error.delay(1000)
            .take(50)
        );
    }

    update(pecaFeira: PecaFeiraDTO) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.put(`${API_CONFIG.baseUrl}/pecasfeira/${pecaFeira.id}`, pecaFeira, { headers: this.headers });
    }

}
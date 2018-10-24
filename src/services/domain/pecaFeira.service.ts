import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_CONFIG} from "../../config/api.config";
import {PecaFeiraDTO} from "../../models/pecaFeiraDTO";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class pecaFeiraService {

    public headers: HttpHeaders;

    constructor(public http: HttpClient) {
    }

    findAll(): Observable<PecaFeiraDTO[]> {
        return this.http.get<PecaFeiraDTO[]>(`${API_CONFIG.baseUrl}/pecasfeira/`);
    }

    save(pecaFeira: PecaFeiraDTO) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.post(`${API_CONFIG.baseUrl}/pecasfeira/`, pecaFeira, {headers: this.headers});
    }

    remove(pecaFeira: PecaFeiraDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/pecasfeira/${pecaFeira.id}`, {});
    }

    get(pecaFeira: string) {
        return this.http.get<PecaFeiraDTO>(`${API_CONFIG.baseUrl}/pecasfeira/${pecaFeira}`, {});
    }

    update(pecaFeira: PecaFeiraDTO) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.put(`${API_CONFIG.baseUrl}/pecasfeira/${pecaFeira.id}`, pecaFeira, {headers: this.headers});
    }

}
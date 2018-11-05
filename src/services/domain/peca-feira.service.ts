import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_CONFIG} from "../../config/api.config";
import {PecaFeiraDto} from "../../models/pecaFeira.dto";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class PecaFeiraService {

    public headers: HttpHeaders;

    constructor(public http: HttpClient) {
    }

    findAll(): Observable<PecaFeiraDto[]> {
        return this.http.get<PecaFeiraDto[]>(`${API_CONFIG.baseUrl}/pecasfeira/`);
    }

    save(pecaFeira: PecaFeiraDto) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.post(`${API_CONFIG.baseUrl}/pecasfeira/`, pecaFeira, {headers: this.headers});
    }

    remove(pecaFeira: PecaFeiraDto) {
        return this.http.delete(`${API_CONFIG.baseUrl}/pecasfeira/${pecaFeira.id}`, {});
    }

    get(pecaFeira: string) {
        return this.http.get<PecaFeiraDto>(`${API_CONFIG.baseUrl}/pecasfeira/${pecaFeira}`, {});
    }

    update(pecaFeira: PecaFeiraDto) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.put(`${API_CONFIG.baseUrl}/pecasfeira/${pecaFeira.id}`, pecaFeira, {headers: this.headers});
    }

}
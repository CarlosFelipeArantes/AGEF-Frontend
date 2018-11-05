import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_CONFIG} from "../../config/api.config";
import {VendaDTO} from "../../models/venda.dto";
import {DefeitoDTO} from "../../models/defeito.dto";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class DefeitoService {

    public headers: HttpHeaders;

    constructor(public http: HttpClient) {
    }

    findAll(): Observable<DefeitoDTO[]> {
        return this.http.get<DefeitoDTO[]>(`${API_CONFIG.baseUrl}/defeitos/`);
    }

    save(defeito: DefeitoDTO) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.post(`${API_CONFIG.baseUrl}/defeitos/`, defeito, {headers: this.headers});
    }

    remove(defeito: DefeitoDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/defeitos/${defeito.id}`, {});
    }

    get(defeito: string) {
        return this.http.get<VendaDTO>(`${API_CONFIG.baseUrl}/defeitos/${defeito}`, {});
    }

    update(defeito: DefeitoDTO) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.put(`${API_CONFIG.baseUrl}/defeitos/${defeito.id}`, defeito, {headers: this.headers});
    }

}
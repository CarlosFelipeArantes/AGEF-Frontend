import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_CONFIG} from "../../config/api.config";
import {ModeloDTO} from "../../models/modelo.dto";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class ModeloService {

    public name: string;
    public tamanho: string;
    public headers: HttpHeaders;

    constructor(public http: HttpClient) {
    }

    findAll(): Observable<ModeloDTO[]> {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.get<ModeloDTO[]>(`${API_CONFIG.baseUrl}/modelos/`, {headers: this.headers});
    }

    save(modelo: ModeloDTO) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.post(`${API_CONFIG.baseUrl}/modelos/`, modelo, {headers: this.headers});
    }

    remove(modelo: ModeloDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/modelos/${modelo.id}`, {});
    }

    update(modelo: ModeloDTO) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.put(`${API_CONFIG.baseUrl}/modelos/` + modelo.id, modelo, {headers: this.headers});
    }

}
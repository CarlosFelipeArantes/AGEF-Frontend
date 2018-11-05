import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_CONFIG} from "../../config/api.config";
import {VendaDTO} from "../../models/venda.dto";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class VendaService {

    public headers: HttpHeaders;

    constructor(public http: HttpClient) {
    }

    findAll(): Observable<any> {
        return this.http.get<VendaDTO[]>(`${API_CONFIG.baseUrl}/vendas/`);
    }

    findByDataBetween(dataInicial: string, dataFinal: string): Observable<any> {
        return this.http.get<VendaDTO[]>(`${API_CONFIG.baseUrl}/vendas?dataInicial=${dataInicial}&dataFinal=${dataFinal}`);
    }

    insert(venda: VendaDTO) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.post(`${API_CONFIG.baseUrl}/vendas/`, venda, {headers: this.headers});
    }

    delete(venda: VendaDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/vendas/${venda.id}`, {});
    }

    estornar(venda: VendaDTO) {
        return this.http.put(`${API_CONFIG.baseUrl}/vendas/${venda.id}/estornar/${venda.pecaFeira.id}`, {});
    }

    update(venda: VendaDTO) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.put(`${API_CONFIG.baseUrl}/vendas/${venda.id}`, venda, {headers: this.headers});
    }
}
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_CONFIG} from "../../config/api.config";
import {VendaDTO} from "../../models/venda.dto";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {PecaFeiraDTO} from "../../models/pecaFeiraDTO";

@Injectable()
export class VendaService {

    public headers: HttpHeaders;

    constructor(public http: HttpClient) {
    }

    findAll(): Observable<any> {
        return this.http.get<VendaDTO[]>(`${API_CONFIG.baseUrl}/vendas/`);
    }

    insert(venda: VendaDTO) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.post(`${API_CONFIG.baseUrl}/vendas/`, venda, {headers: this.headers});
    }

    delete(venda: VendaDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/vendas/${venda.id}`, {});
    }

    deleteByPecaAndAddEstoque(peca: PecaFeiraDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/vendas/byPecaAndAddEstoque/${peca.id}`, {});
    }

    findOne(venda: string) {
        return this.http.get<VendaDTO>(`${API_CONFIG.baseUrl}/vendas/${venda}`, {});
    }

    findByDateBetween(inicio, fim) {
        return this.http.get<VendaDTO>(`${API_CONFIG.baseUrl}/vendas/faturamento/?dataInicial=${inicio}&dataFinal=${fim}`, {});
    }

    update(venda: VendaDTO) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.put(`${API_CONFIG.baseUrl}/vendas/${venda.id}`, venda, {headers: this.headers});
    }
}
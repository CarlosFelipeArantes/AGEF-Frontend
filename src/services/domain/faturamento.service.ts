import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_CONFIG} from "../../config/api.config";
import {VendaDTO} from "../../models/venda.dto";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class FaturamentoService {

    public headers: HttpHeaders;

    constructor(public http: HttpClient) {
    }

    findByDateBetween(inicio, fim) {
        return this.http.get<VendaDTO[]>(`${API_CONFIG.baseUrl}/vendas/?dataInicial=${inicio}&dataFinal=${fim}`, {});
    }

}
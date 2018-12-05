import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { VendaDTO } from "../../models/venda.dto";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/scan';


@Injectable()
export class VendaService {

    public headers: HttpHeaders;

    constructor(public http: HttpClient) {
    }

    findAll(): Observable<any> {
        return this.http.get<VendaDTO[]>(`${API_CONFIG.baseUrl}/vendas/`)
        .timeout(3000)
        .retryWhen(error => error.delay(1000)
        .take(50)
        );
    }

    findByDataBetween(dataInicial: string, dataFinal: string): Observable<any> {
        return this.http.get<VendaDTO[]>(`${API_CONFIG.baseUrl}/vendas?dataInicial=${dataInicial}&dataFinal=${dataFinal}`)
        .timeout(3000)
        .retryWhen(error => error.delay(1000)
        .take(50)
        );
        // .retryWhen((err)=>
        // {
        //   return err.scan((retryCount)=>{
        //     retryCount+=1;
        //     if(retryCount<11)
        //     {
        //       console.log("retrying attemp: "+ retryCount);
        //       return retryCount
        //     }
        //     else
        //     {
        //       throw(err)
        //     }
        //   },0).delay(1000)
        // })
    }

    insert(venda: VendaDTO) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.post(`${API_CONFIG.baseUrl}/vendas/`, venda, { headers: this.headers });
    }

    delete(venda: VendaDTO) {
        return this.http.delete(`${API_CONFIG.baseUrl}/vendas/${venda.id}`, {})
            .timeout(3000)
            .retryWhen(error => error.delay(1000)
            .take(50)
            );
    }

    estornar(venda: VendaDTO) {
        return this.http.put(`${API_CONFIG.baseUrl}/vendas/${venda.id}/estornar/${venda.pecaFeira.id}`, {});
    }

    update(venda: VendaDTO) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        return this.http.put(`${API_CONFIG.baseUrl}/vendas/${venda.id}`, venda, { headers: this.headers })
            .timeout(3000)
            .retryWhen(error => error.delay(1000)
            .take(50)
        );
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../environments/environment'
import { QueryOrderResult } from 'binance-api-node';
@Injectable({
  providedIn: 'root'
})
export class BinanceApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  getOpenOrders(ord: string): Promise<QueryOrderResult[]> {
    return this.http.get<QueryOrderResult[]>(env.APIENDPOINT + 'openOders', {
      params: {
        order: ord
      }
    }).toPromise();
  }
}

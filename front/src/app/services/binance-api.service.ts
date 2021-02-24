import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../environments/environment'
import { Account, AvgPriceResult, QueryOrderResult } from 'binance-api-node';
@Injectable({
  providedIn: 'root'
})
export class BinanceApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAccountInfo(): Promise<Account> {
    return this.http.get<Account>(env.APIENDPOINT + 'binance/accountInfo').toPromise();
  }

  getAvgPrice(sym: string): Promise<AvgPriceResult| AvgPriceResult[]> {
    return this.http.get<AvgPriceResult| AvgPriceResult[]>(env.APIENDPOINT + 'binance/avgPrice', {
      params: {
        symbol: sym
      }
    }).toPromise();
  }

  getOpenOrders(sym: string): Promise<QueryOrderResult[]> {
    return this.http.get<QueryOrderResult[]>(env.APIENDPOINT + 'binance/openOrders', {
      params: {
        symbol: sym
      }
    }).toPromise();
  }

}

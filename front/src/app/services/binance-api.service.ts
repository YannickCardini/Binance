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

  getaccountInfo(): Promise<Account> {
    return this.http.get<Account>(env.APIENDPOINT + 'accountInfo').toPromise();
  }

  getavgPrice(sym: string): Promise<AvgPriceResult| AvgPriceResult[]> {
    return this.http.get<AvgPriceResult| AvgPriceResult[]>(env.APIENDPOINT + 'avgPrice', {
      params: {
        symbol: sym
      }
    }).toPromise();
  }

  getOpenOrders(sym: string): Promise<QueryOrderResult[]> {
    return this.http.get<QueryOrderResult[]>(env.APIENDPOINT + 'openOrders', {
      params: {
        symbol: sym
      }
    }).toPromise();
  }


}

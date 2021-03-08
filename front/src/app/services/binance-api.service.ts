import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../environments/environment'
import { Account, AvgPriceResult, CandleChartInterval, CandleChartResult, QueryOrderResult } from 'binance-api-node';
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

  getAssetIcon(asset: string): string {
    let icon = asset.toLowerCase();
    return './assets/svg/' + icon + '.svg';
  }

  getAvgPrice(sym: string): Promise<AvgPriceResult| AvgPriceResult[]> {
    return this.http.get<AvgPriceResult| AvgPriceResult[]>(env.APIENDPOINT + 'binance/avgPrice', {
      params: {
        symbol: sym
      }
    }).toPromise();
  }

  getCandles(sym: string, interval: string): Promise<CandleChartResult[]>{
    return this.http.get<CandleChartResult[]>(env.APIENDPOINT + 'binance/candles', {
      params: {
        symbol :sym,
        interval: interval
      }
    }).toPromise();
  }

  getPrice(sym: string): Promise<Object> {
    if(sym === "USDTUSDT")
      return new Promise(resolve => resolve({"USDTUSDT":1.0}))
    return this.http.get<Object>(env.APIENDPOINT + 'binance/prices', {
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

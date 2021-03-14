import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Account, AvgPriceResult, CandleChartResult, QueryOrderResult, TradeResult } from 'binance-api-node';
@Injectable({
  providedIn: 'root'
})
export class BinanceApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAccountInfo(): Promise<Account> {
    return this.http.get<Account>(environment.APIENDPOINT + 'binance/accountInfo').toPromise();
  }

  getAssetIcon(asset: string): string {
    let icon = asset.toLowerCase();
    return './assets/svg/' + icon + '.svg';
  }

  getAvgPrice(sym: string): Promise<AvgPriceResult| AvgPriceResult[]> {
    return this.http.get<AvgPriceResult| AvgPriceResult[]>(environment.APIENDPOINT + 'binance/avgPrice', {
      params: {
        symbol: sym
      }
    }).toPromise();
  }

  getCandles(sym: string, interval: string): Promise<CandleChartResult[]>{
    return this.http.get<CandleChartResult[]>(environment.APIENDPOINT + 'binance/candles', {
      params: {
        symbol :sym,
        interval: interval
      }
    }).toPromise();
  }

  getAllOrders(sym: string): Promise<QueryOrderResult[]>{
    return this.http.get<QueryOrderResult[]>(environment.APIENDPOINT + 'binance/getAllOrders', {
      params: {
        symbol :sym,
      }
    }).toPromise();
  }

  getPrice(sym: string): Promise<Object> {
    if(sym === "USDTUSDT")
      return new Promise(resolve => resolve({"USDTUSDT":1.0}))
    return this.http.get<Object>(environment.APIENDPOINT + 'binance/prices', {
      params: {
        symbol: sym
      }
    }).toPromise();
  }

  getOpenOrders(sym: string): Promise<QueryOrderResult[]> {
    return this.http.get<QueryOrderResult[]>(environment.APIENDPOINT + 'binance/openOrders', {
      params: {
        symbol: sym
      }
    }).toPromise();
  }

}

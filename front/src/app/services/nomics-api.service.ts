import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { NomicsPrices } from '../models/nomics-prices.model';

@Injectable({
  providedIn: 'root'
})
export class NomicsApiService {

  constructor(
    private http: HttpClient
  ) { }

  getPriceAtTime(sym: string, time: string): Promise<NomicsPrices[]> {
    return this.http.get<NomicsPrices[]>(environment.APIENDPOINT + 'nomics/getPriceAtTime', {
      params: {
        symbol: sym,
        time: time
      }
    }).toPromise();
  }

}

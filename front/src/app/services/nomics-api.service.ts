import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../environments/environment'
import { NomicsPrices } from '../models/nomics-prices.model';

@Injectable({
  providedIn: 'root'
})
export class NomicsApiService {

  constructor(
    private http: HttpClient
  ) { }

  getPrices(): Promise<NomicsPrices[]> {
    return this.http.get<NomicsPrices[]>(env.APIENDPOINT + 'nomics/prices').toPromise();
  }

}

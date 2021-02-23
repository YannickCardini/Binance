import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BinanceApiService {

  constructor(
    private http: HttpClient
    ){
  }

  getOpenOrders(){
    this.http.get('http://localhost:3000/openOders?order=ADAEUR').subscribe(data => console.log(data))
  }
}

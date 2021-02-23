import { Component } from '@angular/core';
import { BinanceApiService } from './services/binance-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Binance';

  constructor(
    private bianceApi: BinanceApiService
  ){
    this.bianceApi.getOpenOrders();
  }

}

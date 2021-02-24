import { Component, OnInit } from '@angular/core';
import { BinanceApiService } from '../services/binance-api.service';
import * as CanvasJS from '../../canvasjs.min';
import { Account, AssetBalance } from 'binance-api-node';

@Component({
  selector: 'app-binance',
  templateUrl: './binance.component.html',
  styleUrls: ['./binance.component.scss']
})
export class BinanceComponent implements OnInit {

  balances: AssetBalance[];

  constructor(
    private bianceApi: BinanceApiService
  ) { }

  ngOnInit() {
    this.bianceApi.getaccountInfo().then(res => this.balances = this.buildListBalance(res));
  }

  buildListBalance(acc: Account): AssetBalance[]{
    let balances = acc.balances.filter(bal => +bal.free > 0);
    return balances;
  }
  

  getAssetIcon(asset: string): string{
    let icon = asset.toLowerCase();
    switch (asset) {
      case 'IOTA':
        icon = 'miota'
        break;
    
      default:
        break;
    }
    return './assets/svg/' + icon + '.svg';
  }

}

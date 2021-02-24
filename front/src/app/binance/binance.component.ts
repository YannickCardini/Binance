import { Component, OnInit } from '@angular/core';
import { BinanceApiService } from '../services/binance-api.service';
import * as CanvasJS from '../../canvasjs.min';
import { Account, AssetBalance } from 'binance-api-node';
import { NomicsApiService } from '../services/nomics-api.service';
import { MyAssets } from '../models/my-assets.model';

@Component({
  selector: 'app-binance',
  templateUrl: './binance.component.html',
  styleUrls: ['./binance.component.scss']
})
export class BinanceComponent implements OnInit {

  assets: MyAssets[]= [];

  constructor(
    private bianceApi: BinanceApiService,
    private nomicsApi: NomicsApiService
  ) { }

  ngOnInit() {
    this.bianceApi.getAccountInfo().then(async res => await this.buildListBalance(res));
  }

  async buildListBalance(acc: Account): Promise<void>{
    let balances = acc.balances.filter(bal => +bal.free > 0);
    let prices = await this.nomicsApi.getPrices();
    let asset: MyAssets;
    prices.forEach(price =>{
      for (let i = 0; i < balances.length; i++) {
        const el = balances[i];
        if(el.asset === price.currency){
          asset = {
            quantite: +el.free + +el.locked,
            nom: el.asset,
            icon: this.getAssetIcon(el.asset),
            prix: +price.price
          }
          this.assets.push(asset)
        }
      }
    })
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

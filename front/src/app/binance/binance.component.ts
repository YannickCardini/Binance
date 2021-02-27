import { Component, OnInit } from '@angular/core';
import { BinanceApiService } from '../services/binance-api.service';
import { Account, AssetBalance } from 'binance-api-node';
import { MyAssets } from '../models/my-assets.model';

@Component({
  selector: 'app-binance',
  templateUrl: './binance.component.html',
  styleUrls: ['./binance.component.scss']
})
export class BinanceComponent implements OnInit {

  assets: MyAssets[] = [];
  totalValue: number = 0;
  loaded: boolean = false;

  constructor(
    private bianceApi: BinanceApiService,
  ) { }

  ngOnInit() {
    this.bianceApi.getAccountInfo().then(async res => await this.buildListBalance(res));
  }

  async buildListBalance(acc: Account): Promise<void> {
    let balances = acc.balances.filter(bal => +bal.free > 0);
    let asset: MyAssets;
    for (let i = 0; i < balances.length; i++) {
      const bal = balances[i];
      let price = await this.bianceApi.getPrice(bal.asset + "USDT");
      asset = {
        quantite: +bal.free + +bal.locked,
        nom: bal.asset,
        icon: this.getAssetIcon(bal.asset),
        prix: +price[bal.asset + "USDT"],
        value: +price[bal.asset + "USDT"] * (+bal.free + +bal.locked)
      }
      this.totalValue += asset.value;
      this.assets.push(asset);
    }
    this.loaded = true;
  }

  getAssetIcon(asset: string): string {
    let icon = asset.toLowerCase();
    return './assets/svg/' + icon + '.svg';
  }

  

}

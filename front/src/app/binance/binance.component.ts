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
    balances = this.orderBalances(balances);
    let asset: MyAssets;
    for (let i = 0; i < balances.length; i++) {
      const bal = balances[i];
      let price = await this.bianceApi.getPrice(bal.asset + "USDT");
      asset = {
        quantite: +bal.free + +bal.locked,
        nom: bal.asset,
        icon: this.bianceApi.getAssetIcon(bal.asset),
        prix: +price[bal.asset + "USDT"],
        value: +price[bal.asset + "USDT"] * (+bal.free + +bal.locked)
      }
      if (asset.value > 5) {
        this.totalValue += asset.value;
        this.assets.push(asset);
      }
    }
    this.loaded = true;
  }

  orderBalances(ass: AssetBalance[]): AssetBalance[] {
    function compare(a, b) {
      if (a.asset < b.asset) {
        return -1;
      }
      if (a.asset > b.asset) {
        return 1;
      }
      return 0;
    }
    return ass.sort(compare);
  }





}

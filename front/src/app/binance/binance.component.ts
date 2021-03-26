import { Component, OnInit } from '@angular/core';
import { BinanceApiService } from '../services/binance-api.service';
import { Account, AssetBalance } from 'binance-api-node';
import { MyAssets } from '../models/my-assets.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-binance',
  templateUrl: './binance.component.html',
  styleUrls: ['./binance.component.scss']
})
export class BinanceComponent implements OnInit {

  assets: MyAssets[] = [];
  totalValue: number = 0;
  loaded: boolean = false;
  closeResult: string;

  constructor(
    private bianceApi: BinanceApiService,
    private modalService: NgbModal
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAssetDetails(ev:MouseEvent,asset: MyAssets){
    ev.preventDefault();
    const url = window.location.href + '/' + asset.nom;
    window.open(url, "_blank");
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

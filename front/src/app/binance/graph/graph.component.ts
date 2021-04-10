import { Component, OnInit } from '@angular/core';
import { BinanceApiService } from 'src/app/services/binance-api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CandleChartResult, QueryOrderResult } from 'binance-api-node';
import { NomicsApiService } from 'src/app/services/nomics-api.service';
import { stockChart } from 'highcharts/highstock';

export class Rendement {
  investit: number;
  benefice: number;
}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  title: string;
  sym: string;
  rendement: Rendement;
  backgroundImg: string; 
  dataRetrived: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bianceApi: BinanceApiService,
    private nomicsApi: NomicsApiService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((res: ParamMap) => {
        this.sym = res.get('sym');
        this.title = this.sym + " chart";
        this.backgroundImg = "background-image: url(" + this.bianceApi.getAssetIcon(this.sym) + ")";
        this.getCandles(this.sym, "1d");
        this.getOrders(this.sym);
      });
  }

  async getCandles(sym: string, interval: string): Promise<void> {
    if (sym == "USDT")
      sym = "USDC"
    const candles = await this.bianceApi.getCandles(sym + "USDT", interval);
    let data = [];
    candles.forEach((candle: CandleChartResult) => {
      data.push([+candle.openTime, +candle.open, +candle.high, +candle.low, +candle.close])
    });
    this.renderChart(data);
  }

  async getPrice(sym: string): Promise<number> {
    if (sym == "USDT")
      return new Promise(resolve => { resolve(1.00) });
    let price = await this.bianceApi.getPrice(sym + "USDT")
    return +price[sym + "USDT"];
  }

  //Récupere le prix en USD au moment de l'achat
  async getPriceAtTime(sym: string, time: string): Promise<number> {
    if (sym == "USDT")
      return new Promise(resolve => { resolve(1.00) });
    let price = await this.nomicsApi.getPriceAtTime(sym, time);
    if(price && price.length > 0)
      return +price[0].rate;
    else
      return 
  }

  async getOrders(sym: string): Promise<void> {
    const fiat = ["USDT", "BUSD", "EUR", "BNB", "BTC"];
    let res: QueryOrderResult[] = [];
    for (let i = 0; i < fiat.length; i++) {
      const f = fiat[i];
      res = await this.bianceApi.getAllOrders(sym + f).catch(err => null);
      if (res == null)
        continue
      if (res.length > 0) {
        const rendement = await this.parseOrder(res);
        if (this.rendement == null)
          this.rendement = rendement;
        else {
          this.rendement.benefice += rendement.benefice;
          this.rendement.investit += rendement.investit;
        }
      }
    }
  }

  hideCardCandleStick(): string{
    if(this.dataRetrived)
      return "display:block;"; 
    else
      return "display:none;";
  }

  async parseOrder(orders: QueryOrderResult[]): Promise<Rendement> {
    let res: Rendement = { benefice: 0, investit: 0 };
    let buy = 0;
    let sell = 0;
    let quantity = 0;
    // Les ids des ordres a exclure, par exemple pour l'achat de flynn
    const exceptionIds = ["and_cc94f3d06c36437daf00efc6de434dee"];
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];

      if (order.status == "FILLED" && !exceptionIds.includes(order.clientOrderId)) {
        if (+order.price == 0)
          order.price = (+order.origQuoteOrderQty / +order.origQty).toString();

        //Si achetais en monnaie différente de l'USD 
        if (!order.symbol.includes("USD")) {
          console.log(order.symbol.substr(-3))
          const p = await this.getPriceAtTime(order.symbol.substr(-3), order.time.toString());
          console.log(p)
          order.price = (+order.price * p).toString();
        }
        if (order.side == "BUY")
          buy += (+order.price * +order.origQty)
        if (order.side == "SELL")
          sell += (+order.price * +order.origQty)
      }
    }

    if (buy == 0 && sell == 0)
      return res;
    const acc = await this.bianceApi.getAccountInfo();
    const ass = acc.balances.filter(bal => bal.asset == this.sym);
    quantity = +ass[0].free + +ass[0].locked;

    res.benefice = (sell + await this.getPrice(this.sym) * quantity) - buy;
    res.investit = buy;

    return res;
  }

  renderChart(data: Array<Array<number>>): void {
    this.dataRetrived = true;
    stockChart('container', {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: this.sym + " price evolution"
      },
      series: [{
        type: 'candlestick',
        name: 'AAPL Stock Price',
        data: data,
        dataGrouping: {
          units: [
            [ 'day',[1]], [
              'month',
              [1, 2, 3, 4, 6]
            ]
          ]
        }
      }]
    });
  }

}

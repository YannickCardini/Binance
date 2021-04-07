import { Component, OnInit } from '@angular/core';
import { BinanceApiService } from 'src/app/services/binance-api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import { QueryOrderResult } from 'binance-api-node';
import { NomicsApiService } from 'src/app/services/nomics-api.service';
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
  interval: string = '1d';
  sym: string;
  rendement: Rendement;
  backgroundImg: string;
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Date[];
  lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
            quarter: 'MMM YYYY'
          }
        },
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Price in $'
        }
      }]
    },
    yHighlightRange: {
      begin: 0.5,
      end: 0.6
    },
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartLegend: boolean = true;
  lineChartPlugins = [];
  lineChartType: string = 'line';

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
        this.getCandles(this.sym, this.interval);
        this.getOrders(this.sym);
      });
  }

  formatLabel(value: number) {
    const intervals = ['1m', '3m', '5m', '15m', '30m', '1h', '2h',
      '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'];
    this.interval = intervals[value];
    return this.interval;
  }

  async getCandles(sym: string, interval: string): Promise<void> {
    if (sym == "USDT")
      sym = "USDC"
    const candles = await this.bianceApi.getCandles(sym + "USDT", interval);
    const mostRecentPrice = candles.slice(-1)[0].open;
    this.lineChartData = [{ data: candles.map(candle => +candle.open), label: sym + ' (' + mostRecentPrice.substring(0,4) + '$)' }]
    this.lineChartLabels = candles.map(candle => new Date(candle.openTime));
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
    return +price[0].rate;
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

  intervalChange(value: number) {
    const intervals = ['1m', '3m', '5m', '15m', '30m', '1h', '2h',
      '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'];
    this.interval = intervals[value];
    this.getCandles(this.sym, this.interval);
  }

  //@TODO je me suis un peu perdu, actualiser le prix en fonction de la monnaie avec laqeulle j'ai acheté
  async parseOrder(orders: QueryOrderResult[]): Promise<Rendement> {
    let res: Rendement = { benefice: 0, investit: 0 };
    let buy = 0;
    let sell = 0;
    let quantity = 0;
    const dateMin = new Date("01/01/2020");
    // Les ids des ordres a exclure, par exemple pour l'achat de flynn
    const exceptionIds = ["and_cc94f3d06c36437daf00efc6de434dee"];
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];

      if (order.status == "FILLED" && !exceptionIds.includes(order.clientOrderId)) {
        if (+order.price == 0)
          order.price = (+order.origQuoteOrderQty / +order.origQty).toString();

        //Si achetais en monnaie différente de l'USD 
        if (order.symbol.includes("USD")) {
          const p = await this.getPriceAtTime(order.symbol.substring(-3), order.time.toString());
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

}

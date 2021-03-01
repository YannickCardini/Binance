import { Component, OnInit } from '@angular/core';
import { BinanceApiService } from 'src/app/services/binance-api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ChartType } from 'angular-google-charts';
import { CandleChartInterval } from 'binance-api-node';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  interval: string = "1m";
  chart = {
    title: '',
    type: ChartType.LineChart,
    columns: [],
    data: [],
    options: {
      subtitle: 'in dollars (USD)',
      vAxis: {
        title: 'Price in dollar'
      },
      hAxis: {
        title: 'Time interval: ' + this.interval
      },
    }
  };

  constructor(
    private route: ActivatedRoute,
    private bianceApi: BinanceApiService,
  ) { }

  ngOnInit() {
    this.chart 
    this.route.paramMap
      .subscribe((res: ParamMap) => this.getCandles(res.get('sym')));

  }

  async getCandles(sym: string): Promise<void> {
    this.chart.columns = [this.interval, sym];
    this.chart.title += sym + " chart";
    const candles = await this.bianceApi.getCandles(sym + "USDT", this.interval);
    let i = 0;
    candles.forEach(candle => {
      i++;
      this.chart.data.push([new Date(candle.openTime), +candle.open])
    })
    console.log(this.chart.data)
  }

}

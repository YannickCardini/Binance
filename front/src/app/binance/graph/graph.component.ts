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


  interval: string = '1m';
  chart = {
    title: '',
    type: ChartType.LineChart,
    columns: [],
    data: [],
    options: {
      legend: { position: "none" },
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

  formatLabel(value: number) {
    const intervals = ['1m', '3m', '5m', '15m', '30m', '1h', '2h',
    '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'];
    this.interval = intervals[value];
    return this.interval;
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

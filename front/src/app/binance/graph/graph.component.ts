import { Component, OnInit } from '@angular/core';
import { BinanceApiService } from 'src/app/services/binance-api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  title: string;
  interval: string = '1d';
  sym: string;
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
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((res: ParamMap) => {
        this.sym = res.get('sym');
        this.title = this.sym + " chart";
        this.backgroundImg = "background-image: url(" + this.bianceApi.getAssetIcon(this.sym) + ")";
        this.getCandles(this.sym, this.interval);
      });
  }

  formatLabel(value: number) {
    const intervals = ['1m', '3m', '5m', '15m', '30m', '1h', '2h',
      '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'];
    this.interval = intervals[value];
    return this.interval;
  }

  async getCandles(sym: string, interval: string): Promise<void> {
    if(sym == "USDT")
      sym = "USDC"
    const candles = await this.bianceApi.getCandles(sym + "USDT", interval);
    this.lineChartData = [{ data: candles.map(candle => +candle.open), label: sym }]
    this.lineChartLabels = candles.map(candle => new Date(candle.openTime));
  }

  intervalChange(value: number) {
    const intervals = ['1m', '3m', '5m', '15m', '30m', '1h', '2h',
      '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'];
      this.interval = intervals[value];
    this.getCandles(this.sym,this.interval);
  }

}

import { Component, OnInit } from '@angular/core';
import { BinanceApiService } from 'src/app/services/binance-api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  type: ChartType = ChartType.Line;
  myData = [
    ['London', 8136000],
    ['New York', 8538000],
    ['Paris', 2244000],
    ['Berlin', 3470000],
    ['Kairo', 19500000],
  ];
  
  constructor(
    private route: ActivatedRoute,
    private bianceApi: BinanceApiService,
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((res: ParamMap) => this.getCandles(res.get('sym')))
  }

  async getCandles(sym: string): Promise<void> {
    const res = await this.bianceApi.getCandles(sym + "USDT", "1d");
    console.log(res)
  }

}

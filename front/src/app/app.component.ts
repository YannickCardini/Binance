import { Component, HostListener } from '@angular/core';
import { BinanceApiService } from './services/binance-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  public innerWidth: number;
  public minWidth: number = 600;
  routerPage: any = [
    {
      icon: 'home',
      name: 'home',
      link: '/'
    },
    {
      icon: 'assessment',
      name: 'Cryptocurrency',
      link: '/cryptos'
    },
    {
      icon: 'contact_page',
      name: 'Resume',
      link: '/resume'
    },
  ];

  constructor() {
    this.innerWidth = window.innerWidth;
    
  }

}

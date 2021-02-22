import { Component } from '@angular/core';
import binanceApiNode, { Binance } from 'binance-api-node'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Binance';

  constructor(  ){
    // const client = this.binance({
    //   apiKey: 'lBKKMUy8JX1f3LUylz0ZgQRRn1Au6ImEb47Iklzsz19jy1lmvtq7GFKyuKtdq2c2',
    //   apiSecret: '18yiyGYol1kWiT0jRF4bharlrAPZkWvaEAWUiA825ieZtREVqhYbs4Qwo1CddEOF',
    // });
    // client.ping().then(res => console.log(res))
    const client: Binance = binanceApiNode({
      apiKey: '0SOGTq6IM0X2CeCwot7oTmA0BF8SkvIYIWTUyff1znvybSZf1PxL7lJ07uQD6DPy',
      apiSecret: 'oklc5xhz3y04hwl0vkK2rXJ9sJyYkoHlN5VSeN50fPYQVNBjPP9E4v8aih8CwP0o',
    });
    client.openOrders({ symbol:'ADAEUR'}).then(res => console.log(res))
    // client.depositHistory.then(res => console.log(res))

  }

}

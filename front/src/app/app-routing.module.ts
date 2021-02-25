import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BinanceComponent } from './binance/binance.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cryptos', component: BinanceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

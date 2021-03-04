import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BinanceComponent } from './binance/binance.component';
import { GraphComponent } from './binance/graph/graph.component';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cryptos', component: BinanceComponent },
  { path: 'cryptos/:sym', component: GraphComponent },
  { path: 'resume', component: ResumeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

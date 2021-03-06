import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { BinanceComponent } from './binance/binance.component';
import { HomeComponent } from './home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { ResumeComponent } from './resume/resume.component';
import { GraphComponent } from './binance/graph/graph.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { GalleryComponent } from './gallery/gallery.component'

@NgModule({
  declarations: [
    AppComponent,
    BinanceComponent,
    GalleryComponent,
    GraphComponent,
    HomeComponent,
    ResumeComponent,
  ],

  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    HttpClientModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatGridListModule,
    MatSliderModule,
    MatCardModule,
    NgxSkeletonLoaderModule,
    NgbModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

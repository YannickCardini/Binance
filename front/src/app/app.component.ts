import { Component, HostListener } from '@angular/core';

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
  public isMenuCollapsed = true;
  public innerWidth: number;
  public minWidth: number = 600;
  routerPage: any = [
    {
      icon: 'home',
      name: 'Home',
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



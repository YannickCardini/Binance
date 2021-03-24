import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor() { }

  loaded:Array<boolean> = new Array(42);

  ngOnInit(): void {
    this.loaded.fill(false);
  }

}

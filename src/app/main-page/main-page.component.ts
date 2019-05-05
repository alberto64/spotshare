import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  imageList: string[];
  currUrl: number;
  url: string;
  mottoList: string[];
  currMotto: number;
  keyword: string;

  constructor(private router: Router) {
    this.mottoList = ['Explore', 'Collect', 'Share'];
    this.imageList = ['https://icdn3.digitaltrends.com/image/what-is-a-smart-city-series-introduction.jpg',
                      'https://sanjuanpuertorico.com/wp-content/uploads/plaza-la-rogativa-san-juan-puerto-rico-2.gif',
                      'https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/0a/dc/restaurant-chocolat.jpg',
                      'http://res.cloudinary.com/sagacity/image/upload/c_crop,h_433,w_650,x_0,y_0/c_limit,w_1080/v1432765412/shutterstock_92858029_n3eulr.jpg',
                      'https://cdn.shopify.com/s/files/1/1223/8590/products/postcard-set-kuchar-2.jpg?v=1539739004'];
    this.currUrl = -1;
    this.currMotto = -1;
  }

  ngOnInit() {
    console.log('WHy am i here?');

    localStorage.setItem('route', this.router.url);

    this.nextSet();
  }

  nextSet() {
    this.currUrl = (this.currUrl + 1) % this.imageList.length;
    this.currMotto = (this.currMotto + 1) % this.mottoList.length;
    this.url = this.imageList[this.currUrl];
    this.keyword = this.mottoList[this.currMotto];

    setTimeout(() => { this.nextSet();}, 2000);
  }

}

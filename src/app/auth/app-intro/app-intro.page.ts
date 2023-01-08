import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-app-intro',
  templateUrl: './app-intro.page.html',
  styleUrls: ['./app-intro.page.scss'],
})
export class AppIntroPage implements OnInit {
  public static pageName = "AppintroPage";
  @ViewChild(IonSlides) slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 300,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
  }
  };

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}

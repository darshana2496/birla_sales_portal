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

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}

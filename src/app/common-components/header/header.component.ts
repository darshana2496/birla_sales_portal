import { AppComponent } from './../../app.component';
import { Component, Input, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input('type') type;
  @Input('typeTitle') typeTitle;
  @Input('typeEnd') typeEnd;
  @Input('pageNameVal') pageNameVal;


  text: string;

  constructor(public menuCtrl: MenuController, public globalService: GlobalService, public navCtrl: NavController, public app: AppComponent, public router: Router) {
  }

  openSideMenu() {
    // this.globalService.currentlyActivePage = this.navCtrl.getActive().id;
    this.menuCtrl.open();
  }

  goBack(): void {
    this.navCtrl.pop();
  }

  contactModal(): void {
    // this.app.getRootNavs()[1].push("CallPage");
    this.router.navigate(['/callPage'])
  }
}

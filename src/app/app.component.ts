import { Component, ViewChild } from '@angular/core';
import { Network } from '@capacitor/network';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild("myNav") nav: NavController;

  rootPage: string;
  
  constructor(
    public storage: Storage, 
    public globalService: GlobalService,
    ) {
    storage.create();
    Network.getStatus().then(val=> {
      console.log("NETWORK STATUS", val);
      this.globalService.network = val
    })

    storage.get("AccessPin").then(val => {

      this.setInitialPage(val);
  });
  }

  setInitialPage(pin: any): void {
    this.globalService.setInitialProject(); //used to get list of customerProjects added and get if isAppReviewd
    if (pin != null) {
        this.rootPage = "EnterpinPage";
    } else {
        //this.globalService.checkAppReview();
        this.storage.get("FirstTimeAppLoad").then(val => {
            console.log("FirstTimeAppLoad=", val);
            if (val == null) {
                this.rootPage = "AppintroPage";
            } else {
                this.rootPage = "CustIdPage";
            }
        });
    }
}
}

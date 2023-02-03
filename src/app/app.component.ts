import { NavigationEnd, Router } from '@angular/router';
import { Component, ViewChild, Optional } from '@angular/core';
import { Network } from '@capacitor/network';
import {
  NavController,
  Platform,
  MenuController,
  ModalController,
  PopoverController,
  LoadingController,
  ToastController,
  IonRouterOutlet,
  IonTabs,
  IonApp,
} from '@ionic/angular';
import { App } from '@capacitor/app';

import { Storage } from '@ionic/storage-angular';
import { GlobalService } from './services/global.service';
import { map, timer } from 'rxjs';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('myNav') nav: NavController;

  rootPage: string;
  exitAppCount: number = 0;

  constructor(
    public storage: Storage,
    public globalService: GlobalService,
    public platform: Platform,
    public router: Router,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    public device: Device,
    public diagnostic: Diagnostic,
    public popoverController: PopoverController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    @Optional() public routerOutlet: IonRouterOutlet,
    @Optional() public ionTab: IonTabs
  ) {
    storage.create();
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.globalService.currentlyActivePage = event.url;
        this.globalService.checkInternetConnection();

        if (!this.globalService.isAppReviewed) {
          if (
            this.globalService.projectList &&
            this.globalService.projectList.length
          ) {
            this.showUserFeedbackPage();
          }
        }
      }
    });

    this.platform.ready().then(() => {
      App.addListener('backButton', () => {
        App.exitApp();
      });
      if (this.platform.is('cordova')) {
        this.diagnostic.isDeviceRooted().then((isRooted: boolean) => {
          if (isRooted) {
            setTimeout(() => {
              alert(
                'Birla Estate Sales app app cannot run on rooted devices. Inconvenience regretted.'
              );
              App.exitApp();
            }, 2000);
          }
        });
      }

      this.globalService.deviceId = this.device.uuid;

      this.globalService.network = Network.getStatus()
        .then((val) => {
          return val;
        })
        .catch((err) => {
          return null;
        });
      ``;

      this.globalService.getNetworkCarrierInfo();

      storage.get('AccessPin').then((val) => {
        this.setInitialPage(val);
      });
    });
  }

  setInitialPage(pin: any): void {
    this.globalService.setInitialProject(); //used to get list of customerProjects added and get if isAppReviewd
    if (pin != null) {
      this.router.navigate(['enter-pin']);
    } else {
      this.storage.get('FirstTimeAppLoad').then((val) => {
        if (val == null) {
          this.router.navigate(['AppIntroPage']);
        } else {
          this.router.navigate(['login-with-uname']);
        }
      });
    }
  }

  async showUserFeedbackPage() {
    this.globalService.getUserfeedback().then((data) => {
      if (data < 50 && data > 47) {
        switch (this.globalService.currentlyActivePage) {
          case '/set-pin':
          case '/enter-pin':
          case 'ReportLoginIssuePage':
          case '/dashboard':
          case '/vault':
          case '/payments':
          case '/notifications':
            break;

          default:
            this.globalService.showThankyouModal();
            break;
        }
      }
    });
  }
}

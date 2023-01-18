import { NavigationEnd, Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { Network } from '@capacitor/network';
import { NavController, Platform, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('myNav') nav: NavController;

  rootPage: string;

  constructor(
    public storage: Storage,
    public globalService: GlobalService,
    public platform: Platform,
    public router: Router,
    public menuCtrl: MenuController
  ) {
    storage.create();
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.globalService.currentlyActivePage = event.url;
        this.globalService.checkInternetConnection();

        if (!this.globalService.isAppReviewed) {
          if (this.globalService.projectList.length) {
            this.showUserFeedbackPage();
          }
        }
      }
    });

    this.globalService.network = Network.getStatus()
      .then((val) => {
        return val;
      })
      .catch((err) => {
        return null;
      });``

    this.globalService.getNetworkCarrierInfo();

    storage.get('AccessPin').then((val) => {
      this.setInitialPage(val);
    });

    //used to check for tabs
    // platform.registerBackButtonAction(event => {
    //   let menuBarOpen = this.menuCtrl.isOpen();

    //   var activePortal =
    //       this.ionicApp._loadingPortal.getActive() ||
    //       this.ionicApp._modalPortal.getActive() ||
    //       this.ionicApp._toastPortal.getActive() ||
    //       this.ionicApp._overlayPortal.getActive();
    //   if (activePortal) {
    //       activePortal.dismiss();
    //       this.exitAppCount++;
    //       if (!this.nav.canGoBack()) {
    //           if (this.exitAppCount > 1) {
    //               platform.exitApp();
    //           }
    //       }
    //       return;
    //     }

    //     if (menuBarOpen) {
    //         console.log("Menu bar open");
    //         this.menuCtrl.close();
    //         //this.globalService.closeSideMenu();
    //         this.exitAppCount = 0;
    //     } else {
    //         console.log("Menu bar closed");
    //         console.log(this.nav);

    //         if (!this.nav.canGoBack()) {
    //             const tabsNav = this.appCtrl.getNavByIdOrName("myTabsNav") as Tabs;
    //             if (tabsNav != null) {
    //                 if (tabsNav.getSelected().index != 0) {
    //                     this.exitAppCount = 0;
    //                     tabsNav.select(0);
    //                     return;
    //                 }
    //             }

    //             this.exitAppCount++;
    //             if (this.exitAppCount > 1) {
    //                 platform.exitApp();
    //             } else {
    //                 this.globalService.showToastMessage(
    //                     "Press again to exit",
    //                     1000,
    //                     "bottom"
    //                 );
    //             }
    //         } else {
    //             this.exitAppCount = 0;
    //             console.log("this.nav.getActive().id", this.nav.getActive().id);
    //             if (this.nav.getActive().id == "NetworkCheckPage") {
    //                 this.globalService.checkInternetConnection();
    //             } else if (this.nav.getActive().id == "PaymentGatewayResponsePage") {
    //                 this.appCtrl.getRootNavs()[1].setRoot(CustomerTabsPage);
    //                 setTimeout(() => {
    //                     this.appCtrl.getRootNavs()[1].getActiveChildNav().select(0);
    //                 }, 500);
    //             }
    //             else {
    //                 this.nav.pop();
    //             }
    //         }
    //     }
    // });
  }

  setInitialPage(pin: any): void {
    this.globalService.setInitialProject(); //used to get list of customerProjects added and get if isAppReviewd
    if (pin != null) {
      // this.router.navigate(['dashboard']);
    } else {
      this.storage.get('FirstTimeAppLoad').then((val) => {
        if (val == null) {
          this.router.navigate(['AppIntroPage']);
        } else {
          this.router.navigate(['loginwithcustid']);
        }
      });
    }
  }

  async showUserFeedbackPage() {
    this.globalService.getUserfeedback().then((data) => {
      if (data < 50 && data > 47) {
        switch (this.globalService.currentlyActivePage) {
          case 'ModalAppReviewPage':
          case 'set-pin':
          case 'enter-pin':
          case 'ReportLoginIssuePage':
          case '/dashboard':
          case '/vault':
          case '/payments':
          case '/notifications':
            break;

          default:
            this.router.navigate(['ModalAppReviewPage']);
            break;
        }
      }
    });
  }
}

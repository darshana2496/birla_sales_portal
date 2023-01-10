import { Network } from '@capacitor/network';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../environments/environment';
import { GET_IP_API_URL } from '../utilities/constants/globals'
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  projectList: any[];
  customerId: number;
  activeSlideIndicator: number;
  selectedProjectObj: any;
  urls=environment.serverUrl;
  network: any;
  deviceIP: any;


  constructor(
    public _http: HttpClient, 
    public storage: Storage,
    ) {}
  getTermOfUse() {
    let promise = new Promise((resolve, reject) => {
        this._http
            .get(`${this.urls}config/getConfigData/UseTerm`)
            .toPromise()
            .then(response => {

                resolve(response);
            });
    });
    return promise;
  }
  sanitizeHtml(rawHtml: any) {
    var txt = document.createElement('textarea');
    txt.innerHTML = rawHtml;
    return txt.value;
  }

  async setInitialProject() {
    let promise = new Promise((resolve, reject) => {
      this.storage
        .get('ProjectList')
        .then((data) => {
          console.log(data);
          if (data == null) {
            //first time load
            this.projectList = [];
            this.customerId = 0;
          } else {
            this.projectList = data;
            this.storage.get('ProjectCustomerId').then((response: any) => {
              this.customerId = response;
              for (let q = 0; q < data.length; q++) {
                if (data[q].customerProjectId == response) {
                  this.activeSlideIndicator = q;
                  this.selectedProjectObj = data[q];
                }
              }
            });
          }

          console.log('this.globalService.projectList', this.projectList);
          console.log('this.globalService.customerId', this.customerId);
          console.log(
            'this.globalService.selectedProjectObj',
            this.selectedProjectObj
          );
          resolve(true);
        })
        .catch(() => {});

      // this.checkAppReview();
    });
    return promise;
  }

  async getNetworkCarrierInfo(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        if (this.network.connectionType != "none") {
          resolve(this.getIPAddress())
        } else {
          resolve("");
        }
    });
    return promise;
  }

  getIPAddress() {
    this._http.get(GET_IP_API_URL).subscribe((response:any) => {
      this.deviceIP = response.query;
      }, err => {
        this.deviceIP = '127.0.0.1'
      })
  }

  //loading modal
  showOrShowloadingModel(action: string) {
    if (action == "show") {
        // if (!this.loadingCtrlOpenCount) {
        //     this.loadingModel = this.loadingCtrl.create({
        //         content: "<img src='./assets/imgs/loader.gif' alt='loader'>",
        //         spinner: "hide"
        //     });
        //     this.loadingCtrlOpenCount++;
        //     this.loadingModel.present();
        // }
    } else {
        // if (this.loadingCtrlOpenCount) {
        //     this.loadingModel.present().then((response: any) => {
        //         this.loadingModel.dismiss();
        //         this.loadingCtrlOpenCount = 0;
        //     });
        // }
    }
  }

  checkInternetConnection() {
    var connectionType = this.network.connectionType;
    console.log("NETWORK TYPE ====", connectionType);
    // if (connectionType == "none") {
    //     if (this.appCtrl.getRootNavs()[1].getPrevious() != null) {
    //         if (
    //             this.appCtrl.getRootNavs()[1].getActive().component.name ==
    //             "NetworkCheckPage"
    //         ) {
    //             console.log("SHOWING NETWORK CHECKER PAGE");
    //         } else {
    //             if (this.newtworkPageRemoved) {
    //                 this.appCtrl.getRootNavs()[1].push("NetworkCheckPage");
    //                 this.newtworkPageRemoved = false;
    //             }
    //         }
    //     } else {
    //         if (this.newtworkPageRemoved) {
    //             this.appCtrl.getRootNavs()[1].push("NetworkCheckPage");
    //             this.newtworkPageRemoved = false;
    //         }
    //     }
    // } else {
    //     console.log("this.newtworkPageRemoved", this.newtworkPageRemoved);
    //     if (!this.newtworkPageRemoved) {
    //         this.newtworkPageRemoved = true;
    //         console.log("this.currentActivePageReference");
    //         console.log(this.currentActivePageReference);

    //         let page = this.appCtrl.getRootNavs()[1].getPrevious();
    //         console.log(page);

    //         switch (page.component.name) {
    //             case "TabsPage":
    //                 this.appCtrl.getRootNavs()[1].pop();
    //                 this.currentActivePageReference.ionViewWillEnter();

    //                 break;

    //             default:
    //                 this.appCtrl.getRootNavs()[1].pop();

    //                 break;
    //         }
    //     }
    // }
  }
}

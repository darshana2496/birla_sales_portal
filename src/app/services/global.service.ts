import { Network } from '@capacitor/network';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../environments/environment';
import * as CryptoJS from 'crypto-js/crypto-js';
import { AlertController } from '@ionic/angular';
import { GET_IP_API_URL } from '../utilities/constants/globals';
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
  encryptSecretKey = "AAECAwQFBgcICQoLDA0ODw==";
  commonheaderObj = {
    userName: "CPAppbirlaestate",
    password: "CPAppbirla!@#123"
};

//razorPayAuth data
razorPayAuth = {
    vcKeyId: "",
    vcKeySecret: ""
}
encryptedCustId: String;
oneSignalPlayerId: string;
setPinValue: string;
isPhoneUnlocked: boolean = false;
  constructor(
    public _http: HttpClient, 
    public storage: Storage,
    public alertCtrl: AlertController,
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
          resolve(true);
        })
        .catch(() => {});

      // this.checkAppReview();
    });
    return promise;
  }

  async validateCustomerLogic(typedText: number) {
    let promise = new Promise((resolve, reject) => {
        var pasedInt = typedText.toString();
        this.encryptedCustId = this.encryptData(pasedInt);
        if (pasedInt.length) {
            let obj = {
                vcCustomerID: this.encryptedCustId,
                vcIp: "",
                vcDeviceID: ""
                // vcDeviceID: "db377163-09a3-48f6-a93f-13210a82f3ea"
            };

            this.validateCustomer(obj)
                .then((data: any) => {
                    if (data.btIsSuccess) {
                        this.customerId = typedText;
                        resolve(data);
                    } else {
                        resolve(data);
                    }
                })
                .catch((data: any) => {
                    reject(data);
                });
        }
    });
    return promise;
}
validateCustomer(obj) {
  let promise = new Promise((resolve, reject) => {
      this._http
          .post(
              environment.serverUrl + "account/validateCustomer",
             obj
          )
          .toPromise()
          .then(response => {
              resolve(response);
          })
          .catch(response => {
              reject(response);
          });
  });
  return promise;
}
encryptData(msg) {
  var keySize = 256;
  var salt = CryptoJS.lib.WordArray.random(16);
  var key = CryptoJS.PBKDF2(this.encryptSecretKey, salt, {
      keySize: keySize / 32,
      iterations: 100
  });

  var iv = CryptoJS.lib.WordArray.random(128 / 8);

  var encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
  });

  var result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));

  return result;
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
  decrypt(key, ciphertextB64) {

    var key = CryptoJS.enc.Utf8.parse(key);
    var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);

    var decrypted = CryptoJS.AES.decrypt(ciphertextB64, key, { iv: iv });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
  async universalAlert(title: string, message: string, text: string) {
  let alert = await this.alertCtrl.create({
    header: title,
    message: message,
    buttons: [
      {
        text: text,
        role: "cancel",
        handler: () => {
          console.log("Cancel clicked");
        }
      }
    ]
  });
 alert.present();
}
onKeyUpEventOTP(event, index, repeat, uniqueComponentNameId) {
  console.log(event, index, repeat, uniqueComponentNameId);
  const eventCode = event.which || event.keyCode;
  if (event.target.value.length === 1) {
      if (index !== repeat) {
          (<HTMLInputElement>(
              this.getCodeBoxElement(index + 1, uniqueComponentNameId)
          )).focus();
      } else {
          (<HTMLInputElement>(
              this.getCodeBoxElement(index, uniqueComponentNameId)
          )).blur();
          // Submit code
          console.log("submit code");
      }
  }
  if (!event.target.value.length) {
      if (index != 1) {
          (<HTMLInputElement>(
              this.getCodeBoxElement(index - 1, uniqueComponentNameId)
          )).focus();
      }
  }
  if (eventCode === 8 && index !== 1) {
      (<HTMLInputElement>(
          this.getCodeBoxElement(index - 1, uniqueComponentNameId)
      )).focus();
  }
}
getCustomerId(obj) {
  let promise = new Promise((resolve, reject) => {
      this._http.post(this.urls + "account/GetCustomerID", obj).toPromise().then(response => {
          resolve(response);
      })
          .catch(response => {
              reject(response);
          })
  })
  return promise
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

validateOtp(obj) {
  let promise = new Promise((resolve, reject) => {
      this._http
          .post(this.urls + "account/validateotp", JSON.stringify(obj))
          .toPromise()
          .then(response => {
              resolve(response);
          });
  });
  return promise;
}

async checkAccessPin(): Promise<any> {
  let promise = new Promise((resolve, reject) => {
      this.storage.get("AccessPin").then(val => {
          resolve(val);
      });
  });
  return promise;
}

  //A/c verified alert
  AcVerifiedAlert() {
    const alert = this.alertCtrl.create({
        header: "ACCOUNT VERIFIED",
        cssClass: "ac-verify normal"
    });
  }

   //add project to list, which is used in side menu and acc. to selected slider(project) api calls are done
   addCustomerProjectList(serverObj) {
    if (serverObj.vcProjectName == null) {
        serverObj.vcProjectName = "____"
    }

    if (serverObj.vcImageUrl == null) {
        serverObj.vcImageUrl = "./assets/imgs/default-fallback-image_2.png";
    }

    var obj = {
        customerProjectId: parseInt(serverObj.vcCustomerCode, 10),
        customerName: serverObj.vcCustomerName,
        projectName: serverObj.vcProjectName,
        projectImage: serverObj.vcImageUrl
    };
    this.projectList.push(obj);
    this.storage.set("ProjectList", this.projectList);
  }

    //raise an issue alert during login
    issue() {
      const confirm = this.alertCtrl.create({
          header: "NOT YOU?",
          cssClass: "vertical-bottom",
          message:
              "There could be a typing error at your end, please try again. If you still face an issue kindly raise an issue and we will do the rest.",
          buttons: [
              // {
              //     text: "RAISE AN ISSUE",
              //     handler: () => {
              //         this.appCtrl.getRootNavs()[1].push("ReportLoginIssuePage");
              //     }
              // },
              // {
              //     text: "TRY AGAIN",
              //     handler: () => {
              //         this.appCtrl.getRootNavs()[1].setRoot("CustIdPage");
              //         console.log("Agree clicked");
              //     }
              // }
          ]
      });
  }

  onKeyEvent(event,compoid){
    console.log(typeof event.target.value);
  
    if(event.target.value) return compoid.setFocus();
}


onFocusEventOTP(index, uniqueComponentNameId) {
  for (let item = 1; item < index; item++) {
      const currentElement = this.getCodeBoxElement(
          item,
          uniqueComponentNameId
      );
      if (!(<HTMLInputElement>currentElement).value) {
          (<HTMLInputElement>currentElement).focus();
          break;
      }
  }
}
getCodeBoxElement(index: number, uniqueComponentNameId: string) {
  //console.log(index, uniqueComponentNameId);
  let dom = document.getElementById(uniqueComponentNameId);
  //console.log(dom);

  let ref = dom.children.namedItem("pin" + index).children[0];
  return ref;
}
}


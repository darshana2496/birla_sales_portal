import { AssetsPreviewComponent } from './../common-components/assets-preview/assets-preview.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../environments/environment';
import * as CryptoJS from 'crypto-js/crypto-js';
import { AlertController, MenuController } from '@ionic/angular';
import { GET_IP_API_URL } from '../utilities/constants/globals';
import { ICustomerProject } from '../utilities/constants/commonInterface';
import { Subject } from 'rxjs';

import { Router } from '@angular/router';
import { ThankYouModalComponent } from '../pages/thank-you-modal/thank-you-modal.component';
import { AddedProjectSuccessComponent } from '../pages/added-project-success/added-project-success.component';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  projectList: any[];
  customerId: number;
  activeSlideIndicator: number = 0;
  urls = environment.serverUrl;
  network: any;
  deviceIP: any;
  encryptSecretKey = 'AAECAwQFBgcICQoLDA0ODw==';
  commonheaderObj = {
    userName: 'CPAppbirlaestate',
    password: 'CPAppbirla!@#123',
  };
  tdsFilterObject: any = {
    documentType: '',
    startDate: '',
    endDate: '',
  };
  //razorPayAuth data
  razorPayAuth = {
    vcKeyId: '',
    vcKeySecret: '',
  };
  encryptedCustId: String;
  oneSignalPlayerId: string;
  setPinValue: string;
  isPhoneUnlocked: boolean = false;
  selectedProjectObj: ICustomerProject = {
    customerProjectId: 0,
    customerName: '',
    projectImage: '',
    projectName: 'Test',
    userName: '',
  };
  logCustomerDetail: any;
  downloadCollateral: any;
  enteredPin: string;
  appOpenedOnlyFromNotification: boolean = false;
  notificationMsg: any = null;
  private showNotificationTabSubject = new Subject<any>();
  showNotificationTab = this.showNotificationTabSubject.asObservable();
  clearPinInput = new Subject<any>();
  currentlyActivePage: any;
  isAppReviewed: boolean;
  isShowingLoader: boolean;
  notification_count = 0;

  constructor(
    public _http: HttpClient,
    public storage: Storage,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public route: Router,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) {}
  getTermOfUse() {
    let promise = new Promise((resolve, reject) => {
      this._http
        .get(`${this.urls}config/getConfigData/UseTerm`)
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }
  logWithUnamePass(){

  }
  vaultBirlaUploads(obj) {
    let promise = new Promise((resolve, reject) => {
      this._http
        .post(
          environment.serverUrl + 'Uploads/getuploadeddocument',
          JSON.stringify(obj)
        )
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }
  getAboutBirlaEstates() {
    let promise = new Promise((resolve, reject) => {
      this._http
        .get(environment.serverUrl + 'project/getProjects')
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }
  getConfigData() {
    let promise = new Promise((resolve, reject) => {
      this._http
        .get(environment.serverUrl + 'config/getConfigData')
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }
  postFeedback(obj: any) {
    let promise = new Promise((resolve, reject) => {
      this._http
        .post(
          environment.serverUrl + 'config/raisefeedback',
          JSON.stringify(obj)
        )
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }
  getRMDetails() {
    let promise = new Promise((resolve, reject) => {
      this._http
        .get(environment.serverUrl + 'config/getrmdetail/' + this.customerId)
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }
  getRegisterOffices() {
    // https://portalapi.birlaestates.com/api/config/getraisedfeedBack/600014
    let promise = new Promise((resolve, reject) => {
      this._http
        .get(
          environment.serverUrl + 'config/getregisteroffices/' + this.customerId
        )
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }
  getAllRaisedFeedback() {
    // https://portalapi.birlaestates.com/api/config/getraisedfeedBack/600014
    let promise = new Promise((resolve, reject) => {
      this._http
        .get(
          environment.serverUrl + 'config/getraisedfeedBack/' + this.customerId
        )
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }
  vaultMyUploads() {
    let promise = new Promise((resolve, reject) => {
      this._http
        .get(
          environment.serverUrl +
            'Uploads/getuseruploadedddocument/' +
            this.customerId
        )
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }
  getCheckDropLocations() {
    let promise = new Promise((resolve, reject) => {
      this._http
        .get(
          environment.serverUrl +
            'Payment/getchequedroplocations/' +
            this.customerId
        )
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }
  getChequeDropLocation() {
    let promise = new Promise((resolve, reject) => {
      this._http
        .get(
          environment.serverUrl +
            'Payment/getchequedroplocations/' +
            this.selectedProjectObj.customerProjectId
        )
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }
  raiseFeedback(obj: any) {
    let promise = new Promise((resolve, reject) => {
      this._http
        .post(
          environment.serverUrl + 'config/raisefeedback ',
          JSON.stringify(obj)
        )
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }
  getFAQ() {
    let promise = new Promise((resolve, reject) => {
      this._http
        .get(environment.serverUrl + 'config/getFAQs')
        .toPromise()
        .then((response) => {
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
  openNotificationTab() {
    this.showNotificationTabSubject.next(true);
  }
  clearPinInputs(): void {
    this.clearPinInput.next(true);
  }
  getProjectDetails() {
    let promise = new Promise((resolve, reject) => {
      this._http
        .get(
          environment.serverUrl + 'Project/getprojectdetail/' + this.customerId
          //need to replace tempIdforProject with customerId after merge
        )
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }
  previewImage(imgUrl: string) {
    let navParam = {
      fileType: 'jpg',
      isDownloaded: false,
      vcFileUrl: imgUrl,
    };
    this.showPreviewImageModal(navParam);
  }
  showDownloadToast(
    message: string,
    navParam: any,
    duration: number,
    position: string
  ) {
    let pos;
    switch (position) {
      case 'top':
        pos = 'top';
        break;
      case 'bottom':
        pos = 'bottom';
        break;
      case 'middle':
        pos = 'middle';
        break;
    }
    this.downloadCollateral = this.toastCtrl
      .create({
        message: message,
        duration: duration,
        position: pos,
      })
      .then((x) => {
        x.present();
        x.onDidDismiss().then((resolve) => {
          return;
        });
      });
  }

  updateCustomerNotification() {
    let obj = {
      vcCustomerID: this.customerId,
    };

    let promise = new Promise((resolve, reject) => {
      this._http
        .post(
          environment.serverUrl + 'v1/config/updatecustomernotification/',
          obj
        )
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }
  getNotifications() {
    let promise = new Promise((resolve, reject) => {
      this._http
        .get(
          environment.serverUrl + 'config/getnotification/' + this.customerId
        )
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }
  async showConfirmationAlertPrompt(title: string, subTitle: string) {
    const alert = this.alertCtrl.create({
      header: title,
      subHeader: subTitle,
      buttons: [
        {
          text: 'Yes',
          handler: (data) => {
            this.storage.remove('AccessPin');
            if (this.menuCtrl.isOpen()) {
              this.menuCtrl.close().then((response: any) => {
                this.route.navigate(['/login-with-uname']);
                this.clearAllAddedProjects();
              });
            } else {
              this.route.navigate(['/login-with-uname']);
            }
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (data) => {},
        },
      ],
    });
    (await alert).present();
  }
  clearAllAddedProjects() {
    this.storage.remove('ProjectList');
    this.storage.remove('ProjectCustomerId');
    this.storage.remove('ProjectCustomerName');
    this.projectList = [];
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

      this.checkAppReview();
    });
    return promise;
  }

  //check is app is reviewed or not
  async checkAppReview() {
    this.storage
      .get('AppReviewed')
      .then((data) => {
        if (data == null) {
          this.isAppReviewed = false;
        } else {
          this.isAppReviewed = true;
        }
      })
      .catch((data) => {});
  }

  headerSticky(e) {
    var topPos = e.detail.scrollTop;
    if (topPos >= 150) {
      if (this.currentlyActivePage == '/about-birla') {
        document
          .getElementsByTagName('app-about')[0]
          .getElementsByTagName('app-header')[0]
          .classList.remove('typ-transparent');
      }
      if (this.currentlyActivePage == '/dashboard') {
        document
          .getElementsByTagName('app-dashboard')[0]
          .getElementsByTagName('app-header')[0]
          .classList.remove('typ-transparent');
      }
    } else {
      if (this.currentlyActivePage == '/about-birla') {
        document
          .getElementsByTagName('app-about')[0]
          .getElementsByTagName('app-header')[0]
          .classList.add('typ-transparent');
      }
      if (this.currentlyActivePage == '/dashboard') {
        document
          .getElementsByTagName('app-dashboard')[0]
          .getElementsByTagName('app-header')[0]
          .classList.add('typ-transparent');
      }
    }
  }
  async validateCustomerLogic(typedText: number) {
    let promise = new Promise((resolve, reject) => {
      var pasedInt = typedText.toString();
      this.encryptedCustId = this.encryptData(pasedInt);
      if (pasedInt.length) {
        let obj = {
          vcCustomerID: this.encryptedCustId,
          vcIp: '',
          vcDeviceID: '',
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
        .post(environment.serverUrl + 'account/validateCustomer', obj)
        .toPromise()
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          reject(response);
        });
    });
    return promise;
  }
    async validateCustomerwithUnamePass(obj:any) {
      let data={
        "username":this.encryptData(obj.username),
        "password":this.encryptData(obj.password),
      }
      console.log(data,'encrypted');
      let promise = new Promise((resolve, reject) => {
        this.validateCustomerUnamePassword(obj)
        .then((data: any) => {
          if (data.btIsSuccess) {
           
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch((data: any) => {
          reject(data);
        });
      })
      return promise;
    }
  
  
  validateCustomerUnamePassword(obj) {
    let promise = new Promise((resolve, reject) => {
      this._http
        .post(environment.serverUrl + 'v1/account/salesadmin', obj)
        .toPromise()
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          reject(response);
        });
    });
    return promise;
  }
  selectCustomer(id){
    
    let promise = new Promise((resolve, reject) => {
      this._http
        .post(`${environment.serverUrl}v1/account/salesadmin/customerlist?id=${id}`,'')
        
        .toPromise()
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
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
      iterations: 100,
    });

    var iv = CryptoJS.lib.WordArray.random(128 / 8);

    var encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    var result = CryptoJS.enc.Base64.stringify(
      salt.concat(iv).concat(encrypted.ciphertext)
    );

    return result;
  }

  async showLoader() {
    this.isShowingLoader = true;
    // console.log('Inside Show Loader', this.loader);

    return await this.loadingCtrl
      .create({
        message: "<img src='../assets/images/loader.gif' alt='loader'>",
        // duration: 5000,
      })
      .then((a) => {
        a.present().then(() => {
          if (!this.isShowingLoader) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
  }

  async hideLoader() {
    this.isShowingLoader = false;

    return await this.loadingCtrl
      .dismiss()
      .then(() => {})
      .catch((e) => console.log('Error while dismiss', e));
  }

  dropChequeLocations(obj) {
    let promise = new Promise((resolve, reject) => {
      this._http
        .post(environment.serverUrl + 'Payment/postchequedropdetail', obj)
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }
  getPaymentData() {
    let promise = new Promise((resolve, reject) => {
      let obj = { vcCustomerID: this.encryptData(this.customerId) };
      this._http
        .post(environment.serverUrl + 'Payment/customerpaymentdetail', obj)
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }

  checkInternetConnection() {
    var connectionType = this.network.connectionType;
    if (connectionType == 'none') {
      this.route.navigate(['network-check']);
    }
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
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    alert.present();
  }

  getCustomerId(obj) {
    let promise = new Promise((resolve, reject) => {
      this._http
        .post(this.urls + 'account/GetCustomerID', obj)
        .toPromise()
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          reject(response);
        });
    });
    return promise;
  }

  async getNetworkCarrierInfo(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      if (this.network.connectionType != 'none') {
        resolve(this.getIPAddress());
      } else {
        resolve('');
      }
    });
    return promise;
  }

  getIPAddress() {
    this._http.get(GET_IP_API_URL).subscribe(
      (response: any) => {
        this.deviceIP = response.query;
      },
      (err) => {
        this.deviceIP = '127.0.0.1';
      }
    );
  }

  validateOtp(obj) {
    let promise = new Promise((resolve, reject) => {
      this._http
        .post(this.urls + 'account/validateotp', JSON.stringify(obj))
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }

  async checkAccessPin(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.storage.get('AccessPin').then((val) => {
        resolve(val);
      });
    });
    return promise;
  }

  //A/c verified alert
  async AcVerifiedAlert() {
    const alert = await this.alertCtrl.create({
      header: 'ACCOUNT VERIFIED',
      cssClass: 'ac-verify normal',
    });
    alert.present();
  }

  //add project to list, which is used in side menu and acc. to selected slider(project) api calls are done
  addCustomerProjectList(serverObj) {
    if (serverObj.vcProjectName == null) {
      serverObj.vcProjectName = '____';
    }

    if (serverObj.vcImageUrl == null) {
      serverObj.vcImageUrl = './assets/imgs/default-fallback-image_2.png';
    }

    var obj = {
      customerProjectId: parseInt(serverObj.vcCustomerCode, 10),
      customerName: serverObj.vcCustomerName,
      projectName: serverObj.vcProjectName,
      projectImage: serverObj.vcImageUrl,
    };
    this.projectList.push(obj);
    this.storage.set('ProjectList', this.projectList);
  }

  //raise an issue alert during login
  issue() {
    const confirm = this.alertCtrl.create({
      header: 'NOT YOU?',
      cssClass: 'vertical-bottom',
      message:
        'There could be a typing error at your end, please try again. If you still face an issue kindly raise an issue and we will do the rest.',
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
        //     }
        // }
      ],
    });
  }

  onKeyEvent(event: any, compoid, previd) {
    if (event.key == 'Backspace') {
      setTimeout(() => {
        previd.setFocus();
      }, 100);
    } else if (event.key !== 'Backspace' && event.target.value) {
      setTimeout(() => {
        compoid.setFocus();
      }, 100);
    }
  }

  async getUserfeedback() {
    let promise = new Promise((resolve, reject) => {
      var x = Math.floor(Math.random() * 100 + 1);
      resolve(x);
    });
    return promise;
  }

  async showThankyouModal() {
    const modal = this.modalCtrl.create({
      component: ThankYouModalComponent,
    });
    return (await modal).present();
  }
  async showaddedProjectModal(data) {
    const modal = this.modalCtrl.create({
      component: AddedProjectSuccessComponent,
      componentProps: { values: data },
    });
    return (await modal).present();
  }
  // async showThanksModal(){
  //   const modal = this.modalCtrl.create({
  //     component: ThankYouModalComponent
  //   });
  //   return (await modal).present();
  // }
  async showPreviewImageModal(props) {
    const modal = this.modalCtrl.create({
      component: AssetsPreviewComponent,
      componentProps: props,
    });
    return (await modal).present();
  }

  getNotificationCount() {
    let promise = new Promise((resolve, reject) => {
      this._http
        .get(this.urls + 'v1/config/getnotificationcount/' + this.customerId)
        .toPromise()
        .then((response) => {
          resolve(response);
        });
    });
    return promise;
  }
}

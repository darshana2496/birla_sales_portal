import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { IonItemSliding } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import {
  ITdsDocuments,
  IVaultDocumentType,
} from 'src/app/utilities/constants/commonInterface';
import { Share } from '@capacitor/share';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-vault',
  templateUrl: 'vault.page.html',
  styleUrls: ['vault.page.scss'],
})
export class VaultPage implements OnInit {
  customTabs: string;
  disableBtn: boolean = true;
  isSwiperOpen: boolean = false;
  max = 100;
  current = 100;
  myUploadSearch: string;
  searchText: string = '';
  activeItemSliding: IonItemSliding = null;
  isSlideOpen: Boolean = false;
  adminUploadedDocs: ITdsDocuments[] = [];
  userUploadedDocs: ITdsDocuments[] = [];
  staticVaultList: IVaultDocumentType[] = [
    { name: 'Demand Letters', count: 0, documentList: '' },
    { name: 'Payment Receipts', count: 0, documentList: '' },
    { name: 'Other Property Letters', count: 0, documentList: '' },
  ];
  constructor(
    public globalService: GlobalService,
    public route: Router,
    public http: HttpClient,
    public socialShare: SocialSharing
  ) {}
  ngOnInit(): void {
    this.vaultBirlaUploads();
    this.activeItemSliding = null;
    this.isSlideOpen = false;
    this.resetListCount();
  }

  vaultBirlaUploads(): void {
    let encryptedCustId = this.globalService.encryptData(
      this.globalService.customerId
    );
    let obj = {
      vcCustomerID: encryptedCustId,
      vcType: '',
      vcStartDate: '',
      vcEndDate: '',
    };

    this.globalService
      .vaultBirlaUploads(obj)
      .then((response: any) => {
        if (response.btIsSuccess) {
          this.adminUploadedDocs = response.object;

          //if (this.globalService.tdsFilterObject.documentType == "") {
          for (let i = 0; i < response.object.length; i++) {
            let decryptVcType = this.globalService.decrypt(
              this.globalService.encryptSecretKey,
              response.object[i].vcType
            );
            let decryptvcFilename = this.globalService.decrypt(
              this.globalService.encryptSecretKey,
              response.object[i].vcFilename
            );
            let decryptvcFileURL = this.globalService.decrypt(
              this.globalService.encryptSecretKey,
              response.object[i].vcFileUrl
            );

            response.object[i].vcType = decryptVcType;
            response.object[i].vcFilename = decryptvcFilename;
            response.object[i].vcFileUrl = decryptvcFileURL;

            let obj = response.object[i];
            let count = -1;
            for (let j = 0; j < this.staticVaultList.length; j++) {
              const element = this.staticVaultList[j];

              if (element.name == obj.vcType) {
                count = i;
                element.count += 1;
                let newObj = obj.vcFilename + ' ';
                element.documentList += element.documentList + newObj;
              }
            }
            if (count == -1) {
              //new type other then the three static onces
              let newObj = obj.vcFilename;
              let newStaticVal = {
                name: obj.vcType,
                count: 1,
                documentList: newObj,
              };
              this.staticVaultList.push(newStaticVal);
            }
          }
        } else {
          this.adminUploadedDocs = [];
        }
      })
      .catch((response: any) => {
        console.log(response);
      });
  }

  resetListCount() {
    this.staticVaultList = [
      { name: 'Demand Letters', count: 0, documentList: '' },
      { name: 'Payment Receipts', count: 0, documentList: '' },
      { name: 'Other Property Letters', count: 0, documentList: '' },
    ];
  }

  async viewDocs(docsData) {
    if (docsData.vcFileUrl.includes('.pdf')) {
      docsData.fileType = 'pdf';
      let options = 'zoom=no,closebuttoncaption=Close,closebuttoncolor=#000000';
      await Browser.open({ url: docsData.vcFileUrl });
    }

    if (docsData.vcFileUrl.includes('.jpg')) {
      docsData.fileType = 'jpg';
      docsData['isDownloaded'] = false;
      this.route.navigate(['/asset-preview'], docsData);
    }

    if (docsData.vcFileUrl.includes('.png')) {
      docsData.fileType = 'png';
      docsData['isDownloaded'] = false;
      this.route.navigate(['/asset-preview'], docsData);
    }
  }

  shareDoc(data) {

    this.globalService.showDownloadToast('Please wait..', null, 2000, 'top');
    this.globalService.showLoader();
    let currentFiledata = data;
    this.socialShare
      .share(null, null, currentFiledata.vcFileUrl, null)
      .then((response: any) => {
        this.globalService.hideLoader();
      })
      .catch((error: any) => {
        console.log(error);
        
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { IonItemSliding } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { ITdsDocuments, IVaultDocumentType } from 'src/app/utilities/constants/commonInterface';
import { Share } from '@capacitor/share';
import { Directory, Filesystem } from '@capacitor/filesystem';
@Component({
  selector: 'app-vault',
  templateUrl: 'vault.page.html',
  styleUrls: ['vault.page.scss'],
})
export class VaultPage implements OnInit {
  customTabs: string;
  disableBtn: boolean = true;
  isSwiperOpen: boolean = false;
  max = 100; current = 100;
  myUploadSearch: string;
  searchText: string = "";
  activeItemSliding: IonItemSliding = null;
  isSlideOpen: Boolean = false;
  adminUploadedDocs: ITdsDocuments[] = [];
  userUploadedDocs: ITdsDocuments[] = [];
  staticVaultList: IVaultDocumentType[] = [{ "name": "Demand Letters", "count": 0, "documentList": "" }, { "name": "Payment Receipts", "count": 0, "documentList": "" }, { "name": "Other Property Letters", "count": 0, "documentList": "" }];
  constructor(public globalService:GlobalService,public route:Router,) {}
  ngOnInit(): void {
    let val = {
      "value": "birlaUpload",
    }
    this.segmentChanged(val);//change tab to booked
    this.activeItemSliding = null;
    this.isSlideOpen = false;
    this.resetListCount();
  }
  segmentChanged(tabName: any) {
    this.customTabs = tabName.value;
    console.log("this.customTabs", this.customTabs);

    if (this.customTabs == "birlaUpload") {
      this.vaultBirlaUploads();
    }

    if (this.customTabs == "myUpload") {
      this.vaultMyUploads();
    }
  }
  vaultBirlaUploads(): void {
    console.log("this.globalService.tdsFilterObject", this.globalService.tdsFilterObject);
    let encryptedCustId = this.globalService.encryptData(this.globalService.customerId);
    console.log("Encrypted id ", encryptedCustId);
    let obj = {
      "vcCustomerID": encryptedCustId,
      "vcType": "",
      "vcStartDate": "",
      "vcEndDate": "",
    }

    this.globalService.vaultBirlaUploads(obj).then((response: any) => {
      console.log(response);
      if (response.btIsSuccess) {

        console.log("OBJ", this.staticVaultList);
        this.adminUploadedDocs = response.object;
        console.log(this.globalService.tdsFilterObject.documentType);

        //if (this.globalService.tdsFilterObject.documentType == "") {
        for (let i = 0; i < response.object.length; i++) {
          let decryptVcType = this.globalService.decrypt(this.globalService.encryptSecretKey, response.object[i].vcType);
          let decryptvcFilename = this.globalService.decrypt(this.globalService.encryptSecretKey, response.object[i].vcFilename);
          let decryptvcFileURL = this.globalService.decrypt(this.globalService.encryptSecretKey, response.object[i].vcFileUrl);

          response.object[i].vcType = decryptVcType;
          response.object[i].vcFilename = decryptvcFilename;
          response.object[i].vcFileUrl = decryptvcFileURL;
           
          let obj = response.object[i];
          let count = -1;
          for (let j = 0; j < this.staticVaultList.length; j++) {
            const element = this.staticVaultList[j];
            console.log(element);

            if (element.name == obj.vcType) {
              count = i;
              element.count += 1;
              let newObj = obj.vcFilename + " ";
              element.documentList += element.documentList + newObj
            }
          }
          if (count == -1) {//new type other then the three static onces
            let newObj = obj.vcFilename;
            let newStaticVal = { "name": obj.vcType, "count": 1, "documentList": newObj }
            this.staticVaultList.push(newStaticVal);
          }
        }

        console.log(this.staticVaultList);
        //}
        // else {
        //   this.resetListCount();
        //   this.staticVaultList = [];
        //   for (let i = 0; i < response.object.length; i++) {
        //     let obj = response.object[i];
        //     let count = -1;
        //     if (!this.staticVaultList.length) {
        //       let newStaticVal = { "name": obj.vcType, "count": 0 }
        //       this.staticVaultList.push(newStaticVal);
        //     }
        //     for (let j = 0; j < this.staticVaultList.length; j++) {
        //       const element = this.staticVaultList[j];
        //       console.log(element.name);

        //       if (element.name == obj.vcType) {
        //         count = i;
        //         element.count += 1;
        //       }
        //       //element,
        //     }
        //     if (count == -1) {
        //       let newStaticVal = { "name": obj.vcType, "count": 1 }
        //       this.staticVaultList.push(newStaticVal);
        //     }
        //   }
        // }
      } else {
        this.adminUploadedDocs = [];
      }
    }).catch((response: any) => {
      console.log(response);
    })
  }

  vaultMyUploads(): void {
    this.globalService.vaultMyUploads().then((response: any) => {
      console.log(response);
      if (response.btIsSuccess) {
        this.userUploadedDocs = response.object;
        for (let index = 0; index < this.userUploadedDocs.length; index++) {
          if (this.userUploadedDocs[index].vcFileUrl.includes('.pdf')) {
            this.userUploadedDocs[index].fileDataType = "pdf";
          } else {
            this.userUploadedDocs[index].fileDataType = "img";
          }
        }
        console.log(this.userUploadedDocs,);
      } else {
        this.userUploadedDocs = [];
      }
    }).catch((response: any) => {
      console.log(response);
    })
  }

  tdsFilter(): void {
    this.route.navigate(['/']);
    // this.appCtrl.getRootNavs()[1].push("TdsFilterPage");
  }

  showDocType(type: string, count: number) {
    this.globalService.tdsFilterObject.documentType = type;
    if (count) {
    this.route.navigate(['/'])
      // this.appCtrl.getRootNavs()[1].push("VaultDocListPage");
    }
  }

  resetListCount() {
    this.staticVaultList = [{ "name": "Demand Letters", "count": 0, "documentList": "" }, { "name": "Payment Receipts", "count": 0, "documentList": "" }, { "name": "Other Property Letters", "count": 0, "documentList": "" }];
  }

 async viewDocs(docsData) {
    // console.log(docsData);
    if (docsData.vcFileUrl.includes('.pdf')) {
      docsData.fileType = "pdf";
      let options = "zoom=no,closebuttoncaption=Close,closebuttoncolor=#000000";
      await Browser.open({ url:docsData.vcFileUrl});
      // this.inAppBrowser.create(docsData.vcFileUrl, "_system", options)
    }

    if (docsData.vcFileUrl.includes('.jpg')) {
      docsData.fileType = "jpg";
      docsData["isDownloaded"] = false;
      this.route.navigate(['/asset-preview'], docsData)
      
      // this.appCtrl.getRootNavs()[1].push("AssetPreviewPage", { 'previewData': docsData });
    }

    if (docsData.vcFileUrl.includes('.png')) {
      docsData.fileType = "png";
      docsData["isDownloaded"] = false;
      this.route.navigate(['/asset-preview'], docsData)
      // this.appCtrl.getRootNavs()[1].push("AssetPreviewPage", { 'previewData': docsData });
    }
  }
 async action(data){
    this.globalService.showDownloadToast(
      "Please wait..",
      null,
      2000,
      "top"
    );
    let currentFiledata=data;
    //file reader
    
    // try{
    //   // let pdfurl='https://cryptic-headland-94862.herokuapp.com/'+currentFiledata.vcFileUrl;
    //   const response: Response = currentFiledata.vcFileUrl;
    //   console.log(response);
    //   const blob: Blob = await response.blob();
    //   const reader = new FileReader();
    //   reader.onloadend = async () => {
    //     const file = await Filesystem.writeFile({
    //       data: reader.result as string,
    //       directory: Directory.Cache,
    //       path: currentFiledata.vcFilename
    //     });
    
    //     this.sharefile(file.uri,currentFiledata);
    //   };
    //  reader.readAsDataURL(blob)
    // }
    // catch(error){
    //   console.error(error);
    // }
    

    console.log(data,'data check')
  //   const file= Filesystem.writeFile({
  //     path: data.vcFilename,
  //     data: data.vcFileUrl,
  //     directory: Directory.Cache
  //   })
  //  console.log(file,'file pdf check');
    this.globalService.showOrShowloadingModel('show')
    Share.share({
      dialogTitle:'file',
      title: data.vcFilename,
      text:data.vcFilename,
      files:[data.vcFileUrl],
    });
    // Filesystem.writeFile({
    //   path:  data.vcFilename,
    //   data: base64Data,
    //   directory: Directory.Cache
    // })
    //   .then(() => {
    //     return Filesystem.getUri({
    //       directory: Directory.Cache,
    //       path:  data.vcFilename
    //     });
    //   })
    //   .then((uriResult) => {
    //     return Share.share({
    //       title:  data.vcFilename,
    //       text:  data.vcFilename,
    //       url: uriResult.uri,
    //     });
    //   });
    // let filedataurl:string[]=[
    //   data.vcFileUrl
    // ]
    // Share.share({
    //   dialogTitle:'file',
    //   title: data.vcFilename,
    //   text:data.vcFilename,
    //   files:filedataurl,
    // });
    // this.socialShare
    //   .share(null, null, this.pageData.vcFileUrl, null)
    //   .then((response: any) => {
    //     this.globalService.showOrShowloadingModel('hide')
    //     console.log("share data", response);

    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //     this.globalService.showOrShowloadingModel('hide')
    //   });
  //  Share.share({
  //     dialogTitle:'file',
  //     title: data.vcFilename,
  //     text:data.vcFilename,
  //     url:data.vcFileUrl,
  //     files:[data.vcFileUrl],
  //   });
 
// Share.share({
    //   dialogTitle:'file',
    //   title: data.vcFilename,
    //   text:data.vcFilename,
    //   files:filedataurl,
    // });
}
  async sharefile(fileUri: string,data:any) {
    try {
      console.log('sahre called')
      const shareResult = await Share.share({
        dialogTitle: data.vcFilename,
        title: data.vcFilename,
        url: fileUri // I also tried using the files property and passing the value as [fileUri] but the same thing happens
      });
      console.log(shareResult.activityType);
    } catch (error) {
      console.log(error);
    }
}
}
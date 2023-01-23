import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-assets-preview',
  templateUrl: './assets-preview.component.html',
  styleUrls: ['./assets-preview.component.scss'],
})
export class AssetsPreviewComponent implements OnInit {
  previewData: any;
  imageUrl: string;
  trustedVideoUrl: SafeResourceUrl;
  slideOpts = {
    initialSlide: 0,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  };
  constructor(
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.previewData = this.navParams.data;
    if (
      this.previewData.fileType == 'jpg' ||
      this.previewData.fileType == 'png'
    ) {
      if (this.previewData.isDownloaded) {
        //when file is downloaded and "View" btn is clicked
        this.imageUrl = this.previewData.nativeUrl;
      } else {
        this.imageUrl = this.previewData.vcFileUrl;
      }
    }

    // if (this.previewData.fileType == "video") {

    //   var previewVideo = "https://www.youtube.com/embed/" + this.previewData.linkName;
    //   console.log("previewVideo", previewVideo);
    //   this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(previewVideo);
    //   //this.globalService.showLoadingModel();

    // }
  }
  closePage(): void {
    this.modalCtrl.dismiss();
  }
  handleIFrameLoadEvent(): void {
    //this.globalService.hideLoadingModel();
  }
}

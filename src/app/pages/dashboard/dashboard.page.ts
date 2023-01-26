import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DomController, IonSlides } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashBoard implements OnInit {
  public static pageName = 'DashboardPage';
  projectStages: any = [];
  possessionDate: string;
  estimatedCompletion: string;
  projectName: string;
  projectDescription: string;
  floorPlanImg: string;

  blogsList: any = [];
  projectImages: any = [];

  constructionVideoList: any = [];
  response: any;

  apartmentType: string;
  buildingFloor: string;
  apartmentSize: string;
  apartmentWing: string;
  unit: string;
  aggrementValue: string = '0';
  towerCode: string;

  selectedConstructionPhase: string = '';
  showConstructionProgressDetails: boolean = false;
  constructionStageImg: string;

  estimationCompletionDate: string = '';
  showEstimationCompletionDate: boolean = false;

  slideOpts = {
    initialSlide: 0,

    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  };

  slideOpts2 = {
    slidesPerView: 2,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };
  slideOpts3 = {
    slidesPerView: 3,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };

  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild('ProjectStagesSlides') ProjectStagesSlides: IonSlides;
  @ViewChild('content') content: any;
  constructor(
    public globalService: GlobalService,
    public domCtrl: DomController
  ) {}
  ngOnInit(): void {
   
    this.showConstructionProgressDetails = false;
    this.globalService
      .getProjectDetails()
      .then((response: any) => {
        var activeStageIndex;

        if (response.btIsSuccess) {
          let obj = response.object;

          this.projectName = obj.vcName;
          this.projectImages = obj.customerProjectDetail_ImagesList;
          this.floorPlanImg = obj.vcUnitLayout;

          this.apartmentType = obj.vcUnitType;
          this.buildingFloor = obj.vcFloor;
          this.apartmentSize = obj.vcUnitSize;
          this.apartmentWing = obj.vcApparment;
          this.unit = obj.vcUnitNo;
          this.aggrementValue = obj.vcAgreementValue;
          this.towerCode = obj.vcTowerCode;

          if (
            obj.vcEstimationCompletionDate.length &&
            obj.vcEstimationCompletionDate != null
          )
            this.estimationCompletionDate = obj.vcEstimationCompletionDate;
          if (obj.customerProjectDetail_StagesList.length) {
            this.projectStages = obj.customerProjectDetail_StagesList;

            for (let i = 0; i < this.projectStages.length; i++) {
              let stage = this.projectStages[i];

              let stageIndex = stage.btIsActive ? i : -1;
              if (stageIndex == -1) {
                stage.stageCompleted = true;
                if (i > activeStageIndex) {
                  stage.stageCompleted = false;
                }
              } else {
                activeStageIndex = i;
                stage.stageCompleted = false;
              }

              let videoList = stage.videoList;

              for (let j = 0; j < videoList.length; j++) {
                let videoLink = videoList[j].vcLink;
                let watchLink = videoLink.slice(
                  videoLink.lastIndexOf('=') + 1,
                  videoLink.length
                );
                videoList[j].linkName = watchLink;
                videoList[j].previewImg =
                  'https://img.youtube.com/vi/' + watchLink + '/mqdefault.jpg';
              }
            }

            this.possessionDate = obj.vcPossessionDate;
          }
          this.projectDescription = obj.vcDescription;
          this.blogsList = obj.customerProjectDetail_BlogsList;

          this.constructionVideoList = this.projectStages[0]; //set initial video list

          setTimeout(() => {
            //this.projectImagesSlides.slideTo(1, 0);
            if (this.projectStages.length <= 3) {
              this.ProjectStagesSlides.slideTo(0, 0);
              this.ProjectStagesSlides.lockSwipes(true);
            }
          }, 100);
        }
      })
      .catch((response: any) => {
        console.log(response);
      });
  }

  viewImage(imgUrl: string): void {
    if (imgUrl != null || imgUrl.length)
      this.globalService.previewImage(imgUrl);
  }
  playVideo(videoDetails: any): void {
    videoDetails.fileType = 'video';
  }
  showSegment(index: number, stageName: string): void {
    this.selectedConstructionPhase = stageName;
    this.constructionVideoList = this.projectStages[index];
    this.constructionStageImg = this.projectStages[index].vcImageUrl;

    if (!this.showConstructionProgressDetails) {
      setTimeout(() => {
        this.content.scrollToBottom(300);
      }, 500);
    }

    this.showConstructionProgressDetails = true;
  }
}

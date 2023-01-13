import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashBoard {
  public static pageName = "DashboardPage";
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
  aggrementValue: string = "0";
  towerCode: string;

  selectedConstructionPhase: string = "";
  showConstructionProgressDetails: boolean = false;
  constructionStageImg: string;

  estimationCompletionDate: string = "";
  showEstimationCompletionDate: boolean = false;
  constructor(public globalService:GlobalService) {}
  ionViewWillEnter() {
   
    this.showConstructionProgressDetails = false;
    this.globalService.getProjectDetails().then((response: any) => {
      console.log(response);
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

        // if (obj.vcEstimationCompletionDate.length && obj.vcEstimationCompletionDate != null)
        //   this.estimationCompletionDate = obj.vcEstimationCompletionDate;

        // if (this.estimationCompletionDate != null || this.estimatedCompletion.length) {
        //   let eDate = moment('31 Dec 2020', "DD MMM YYYY");
        //   let now = moment();
        //   console.log(eDate, now);
        //   if (now > eDate) {
        //     console.log("date is past");
        //   } else {
        //     console.log("date is future");
        //     this.showEstimationCompletionDate = true;
        //   }
        // }


        // if (obj.customerProjectDetail_StagesList.length) {
        //   this.projectStages = obj.customerProjectDetail_StagesList;

        //   for (let i = 0; i < this.projectStages.length; i++) {
        //     let stage = this.projectStages[i];

        //     let stageIndex = stage.btIsActive ? i : -1;
        //     if (stageIndex == -1) {
        //       stage.stageCompleted = true;
        //       if (i > activeStageIndex) {
        //         stage.stageCompleted = false;
        //       }
        //     } else {
        //       activeStageIndex = i;
        //       stage.stageCompleted = false;
        //     }

        //     let videoList = stage.videoList;

        //     for (let j = 0; j < videoList.length; j++) {
        //       let videoLink = videoList[j].vcLink;
        //       console.log("video link", videoLink);
        //       let watchLink = videoLink.slice(videoLink.lastIndexOf('=') + 1, videoLink.length);
        //       videoList[j].linkName = watchLink;
        //       videoList[j].previewImg = "https://img.youtube.com/vi/" + watchLink + "/mqdefault.jpg";
        //     }
        //   }

        //   this.possessionDate = obj.vcPossessionDate;
        // }
        // this.projectDescription = obj.vcDescription;
        // this.blogsList = obj.customerProjectDetail_BlogsList;

        // console.log(this.blogsList);
        // console.log(this.floorPlanImg);

        // this.constructionVideoList = this.projectStages[0];//set initial video list
        // console.log("this.constructionVideoList", this.constructionVideoList);

        // setTimeout(() => {
        //   //this.projectImagesSlides.slideTo(1, 0);
        //   console.log(this.projectStages.length);
        //   if (this.projectStages.length <= 3) {
       
        //   }
        // }, 100);

      } 
      else {
        console.log("No project avaliable")
      }
    }).catch((response: any) => {
      console.log(response);
    });
  }

}

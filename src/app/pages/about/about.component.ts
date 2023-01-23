import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
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
  projectList: any = [];
  serverErrorResponse: string;
  constructor(public globalService: GlobalService) {}

  ngOnInit() {
    this.aboutBirla();
  }
  aboutBirla() {
    this.globalService
      .getAboutBirlaEstates()
      .then((response: any) => {
        if (response.btIsSuccess) {
          let data = response.object;
          this.projectList = data;
          for (let i = 0; i < this.projectList.length; i++) {
            let obj = this.projectList[i];
            obj.intCompletedPercent = 50;
            let commaString = obj.vcProjectName.replace(' ', ',');
            obj.vcProjectName = commaString.split(',');
          }
        } else {
          this.projectList = [];
          this.serverErrorResponse = response.statusMessage;
        }
      })
      .catch((response: any) => {
        console.log(response);
      });
  }
  async viewProject(projectLink: string) {
    if (projectLink.length != null)
      if (projectLink.length) await Browser.open({ url: projectLink });
    // this.inAppBrowser.create(projectLink, "_system")
  }
}

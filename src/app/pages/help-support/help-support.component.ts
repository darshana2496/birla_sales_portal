import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-help-support',
  templateUrl: './help-support.component.html',
  styleUrls: ['./help-support.component.scss'],
})
export class HelpSupportComponent implements OnInit {
  contactTime: string;
  contactNumber: string;
  managerName: any;
  managerEmailId: any;
  siteLocation: any;
  siteData: any;
  constructor(public globalService: GlobalService,public route:Router) { }

  ngOnInit() {
    this.getCustomerCareDetails();
    this.getRmDetailsData();
  }
  getCustomerCareDetails() {
    this.globalService.getConfigData().then((response: any) => {
      console.log(response);
      if (response.btIsSuccess) {
        let data = response.object
        for (let i = 0; i < data.length; i++) {
          if (data[i].vcKey == "ContactTime") {
            this.contactTime = data[i].vcvalue;
          }

          if (data[i].vcKey == "ContactNumber") {
            this.contactNumber = data[i].vcvalue;
          }
        }
      } else {
        this.contactTime = null;
        this.contactNumber = null;
      }
    }).catch((response: any) => {
      console.log(response);
    });

    this.globalService.getRMDetails().then((response: any) => {
      if (response.btIsSuccess) {
        this.contactTime = response.object.vcWorkingTime
        this.contactNumber = response.object.vcContactNo;
        this.siteLocation = response.object.vcLocationMap;
      }
    }).catch((response: any) => {
      console.log(response);
    });

    this.globalService.getRegisterOffices().then((response: any) => {
      if (response.btIsSuccess) {
        // this.contactTime = response.object.vcWorkingTime
        console.log("SITE DATA", response)

        this.siteData = response.object[0]
      }
    }).catch((response: any) => {
      console.log(response);
    });
  }

  getRmDetailsData() {
    this.globalService.getRMDetails().then((response: any) => {
      console.log(response);
      let data = response.object;
      if (response.btIsSuccess) {
        if (data.vcName == null) {
          this.managerName = null;
        } else {
          this.managerName = data.vcName;
        }
        if (data.vcEmail == null) {
          this.managerEmailId = null;
        } else {
          this.managerEmailId = data.vcEmail;
        }
      } else {
        this.managerName = null;
        this.managerEmailId = null;
      }
    }).catch((response: any) => {
      console.log(response);
    });
  }
  goToPage(pageType): void {
    switch (pageType) {
      case "feedback":
        this.route.navigate(['/FeedbackQueryPage']);
        break;
      case "faq":
        this.route.navigate(['/faq']);
        break;
      default:
        break;
    }
  }

}

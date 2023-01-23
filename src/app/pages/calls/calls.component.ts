import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.scss'],
})
export class CallsComponent implements OnInit {
 
  managerName: any;
  managerContactNo: any;
  managerEmailId: any;

  constructor(public globalService: GlobalService) { }

  ngOnInit() {
    this.globalService.getRMDetails().then((response: any) => {
      console.log(response);
      let data = response.object;
      if (response.btIsSuccess) {
        if (data.vcName == null) {
          this.managerName = null;
        } else {
          this.managerName = data.vcName;
        }
        if (data.vcContactNo == null) {
          this.managerContactNo = null;
        } else {
          this.managerContactNo = data.vcContactNo;
        }
        if (data.vcEmail == null) {
          this.managerEmailId = null;
        } else {
          this.managerEmailId = data.vcEmail;
        }

      } else {
        this.managerName = null;
        this.managerContactNo = null;
      }
    }).catch((response: any) => {
      console.log(response);
    });
  }

}

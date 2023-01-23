import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  typedText:string="";
  constructor(public globalService:GlobalService,public router:Router) { }

  ngOnInit() {}
  inputBtn() {
    console.log('button clicked')
   
      let addedProj = this.globalService.projectList;
      for (let i = 0; i < addedProj.length; i++) {
        if (addedProj[i].customerProjectId == parseInt(this.typedText)) {
          this.globalService.universalAlert("Project already present", "Looks like this project is already added. Try using someother customer id.", "Ok");
          this.typedText = "";
          return;
        }
      }

      this.globalService.validateCustomerLogic(Number(this.typedText)).then((response: any) => {
        console.log(response);
        if (response.btIsSuccess) {
          this.router.navigate(['/otp'])
          // this.navCtrl.push("ValidateCustIdPage", { "serverResponse": response.object });
        } else {
          this.globalService.universalAlert("", response.statusMessage, "Ok");
        }
        this.typedText = "";
      }).catch((response: any) => {
        console.log(response);
      })
    
  }
}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login-with-cust-id',
  templateUrl: './login-with-cust-id.component.html',
  styleUrls: ['./login-with-cust-id.component.scss'],
})
export class LoginWithCustIdPage implements OnInit {
  encryptSecretKey = this.globalService.encryptSecretKey;
  validateCustData: any;
  text: string;
  currentlyActivePage: string;
  typedText: string;
  constructor(
    public router: Router,
    public globalService: GlobalService,
    public storage: Storage,
    public navCtrl: NavController
  ) {}

  ngOnInit() {}

  inputBtn() {
    var text;
    if (this.typedText != undefined) {
      text = parseInt(this.typedText, 10);
      this.typedText = '';

      this.globalService
        .validateCustomerLogic(text)
        .then((response: any) => {
          if (response.statusMessage == 'Invalid Customer') {
          } else {
            var decryptedContactNo = this.globalService.decrypt(
              this.encryptSecretKey,
              response.object.vcContactNo
            );
            var decryptedEmail = this.globalService.decrypt(
              this.encryptSecretKey,
              response.object.vcEmail
            );
            var decryptedName = this.globalService.decrypt(
              this.encryptSecretKey,
              response.object.vcName
            );
          }

          this.validateCustData = {
            vcContactNo: decryptedContactNo,
            vcEmail: decryptedEmail,
            vcName: decryptedName,
          };
          if (response.btIsSuccess) {
            response['object']['otp'] = response.vcTitle;
            this.globalService.logCustomerDetail=this.validateCustData
            // this.navCtrl.push("ValidateCustIdPage", { "serverResponse": this.validateCustData });
            this.router.navigate(['/otp']);
          } else {
            this.globalService.universalAlert('', response.statusMessage, 'Ok');
          }
        })
        .catch((response: any) => {
          console.log(response);
        });


    }
    // this.router.navigate(['/otp'])
  }
  inputChanged(event) {}
}

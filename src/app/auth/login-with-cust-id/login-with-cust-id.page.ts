import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login-with-cust-id',
  templateUrl: './login-with-cust-id.page.html',
  styleUrls: ['./login-with-cust-id.page.scss'],
})
export class LoginWithCustIdPage implements OnInit {
  encryptSecretKey = this.globalService.encryptSecretKey;
  validateCustData: any;
  text: string;
  currentlyActivePage: string;
  typedText: string;
  constructor(public navCtrl: NavController, public globalService: GlobalService,public storage:Storage) { }

  ngOnInit() {
  }
  getUser(){
    console.log(this.storage);
  }
  inputBtn(){
    var text;
    console.log('button click',this.typedText)
    if (this.typedText != undefined) {
      text = parseInt(this.typedText, 10);
      console.log("typedCustomerId", text);
      this.typedText = "";

      this.globalService.validateCustomerLogic(text).then((response: any) => {
        console.log("-----", response);
        if(response.statusMessage=='Invalid Customer'){

        }
        else{
          var decryptedContactNo = this.globalService.decrypt(this.encryptSecretKey, response.object.vcContactNo)
          var decryptedEmail = this.globalService.decrypt(this.encryptSecretKey, response.object.vcEmail)
          var decryptedName = this.globalService.decrypt(this.encryptSecretKey, response.object.vcName)
          console.error("DECRYPTED DATA", decryptedContactNo, decryptedEmail, decryptedName);
        }
        

        this.validateCustData = {
          vcContactNo: decryptedContactNo,
          vcEmail: decryptedEmail,
          vcName: decryptedName
        }


        if (response.btIsSuccess) {
          response["object"]["otp"] = response.vcTitle;

          // this.navCtrl.push("ValidateCustIdPage", { "serverResponse": this.validateCustData });
        } else {
          this.globalService.universalAlert("", response.statusMessage, "Ok");
        }
      }
      ).catch((response: any) => {
        console.log(response);
      });
    }
  }
  inputChanged(event){
console.log(event.target.value)
  }
}

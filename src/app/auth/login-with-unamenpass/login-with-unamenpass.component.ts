import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login-with-unamenpass',
  templateUrl: './login-with-unamenpass.component.html',
  styleUrls: ['./login-with-unamenpass.component.scss'],
})
export class LoginWithUnamenpassComponent implements OnInit {
  logForm:FormGroup;
  encryptSecretKey = this.globalSrv.encryptSecretKey;
  constructor(public router:Router,public fb:FormBuilder,public globalSrv:GlobalService) {
    this.logForm=fb.group({
      username:fb.control('',Validators.required),
      password:fb.control('',Validators.required)
    })
   }

  ngOnInit() {}
fnSubmit(){
  console.log(this.logForm.value)
this.globalSrv.validateCustomerwithUnamePass(this.logForm.value).then((response: any) => {
  if (response.statusMessage == 'Invalid Customer') {
  } else {
    // var decryptedContactNo = this.globalService.decrypt(
    //   this.encryptSecretKey,
    //   response.object.vcContactNo
    // );
    // var decryptedEmail = this.globalService.decrypt(
    //   this.encryptSecretKey,
    //   response.object.vcEmail
    // );
    // var decryptedName = this.globalService.decrypt(
    //   this.encryptSecretKey,
    //   response.object.vcName
    // );
  }

  // this.validateCustData = {
  //   vcContactNo: decryptedContactNo,
  //   vcEmail: decryptedEmail,
  //   vcName: decryptedName,
  // };
  if (response.btIsSuccess) {
    response['object']['otp'] = response.vcTitle;

    // this.globalService.logCustomerDetail=this.validateCustData
    // this.navCtrl.push("ValidateCustIdPage", { "serverResponse": this.validateCustData });
    this.router.navigate(['/select-customer']);
  } else {
    this.globalSrv.universalAlert('', response.statusMessage, 'Ok');
  }
})
.catch((response: any) => {
  console.log(response);
});
}
}

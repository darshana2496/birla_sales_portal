import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-login-with-unamenpass',
  templateUrl: './login-with-unamenpass.component.html',
  styleUrls: ['./login-with-unamenpass.component.scss'],
})
export class LoginWithUnamenpassComponent implements OnInit {
  logForm: FormGroup;
  encryptSecretKey = this.globalSrv.encryptSecretKey;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public globalSrv: GlobalService,
    public storage: Storage
  ) {
    this.logForm = fb.group({
      username: fb.control('', Validators.required),
      password: fb.control('', Validators.required),
    });

    // console.log(
    //   'Decrypt',
    //   this.globalSrv.decrypt(
    //     this.encryptSecretKey,
    //     '8X1+diJI85bCBuVJy5a1msk4xZZlkjNpysEWuVJmAEyND0dSc75CFqR7KIDNOUwO36Kzr82Guu2ElRkd1cWLSdptq+5UXSewz3muwJgjL/yIKkOYJMr8gGh5lIa8KDLV9olIHJixdTZp3LJOedNKDdqaSf3sHAmygBDSZPyVhdzoYfrZJXZ1O0XbHut13neC'
    //   )
    // );
  }

  ngOnInit() {}
  fnSubmit() {
    this.globalSrv
      .validateCustomerwithUnamePass(this.logForm.value)
      .then((response: any) => {
        if (response && response.btIsSuccess) {
          // this.globalSrv.userData = this.globalSrv.decrypt(
          //   this.encryptSecretKey,
          //   response.object
          // );
          this.storage.set('ProjectCustomerName', response.object.name);

          this.storage.set('ProjectCustomerLogDetail', response.object);

          this.globalSrv.userData = response.object;
          console.log('user data', this.globalSrv.userData);
          // this.router.navigate(['/select-customer']);
          this.globalSrv
            .checkAccessPin()
            .then((response: any) => {
              if (response != null) {
                //when user is logged in
                // this.navCtrl.push("ModalProjectAddSuccessPage", { 'projectObj': obj })
                // call modal of project added successfully
                console.log(response, 'response from local');
                // this.globalSrv.showaddedProjectModal(obj);
                this.router.navigate(['/enter-pin']);
                // this.router.navigate(['/add-project']);
              } else {
                this.globalSrv.AcVerifiedAlert();

                this.router.navigate(['/set-pin']);
              }
            })
            .catch((response: any) => {});
        } else {
          this.globalSrv.universalAlert('', response.vcDescription, 'Ok');
        }
      })
      .catch((response: any) => {
        console.log(response);
      });
  }
}

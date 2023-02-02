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
  logForm: FormGroup;
  encryptSecretKey = this.globalSrv.encryptSecretKey;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public globalSrv: GlobalService
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
        if (response.btIsSuccess) {
          this.globalSrv.userData = this.globalSrv.decrypt(
            this.encryptSecretKey,
            response.object
          );

          console.log('Decrypted data', this.globalSrv.userData);
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

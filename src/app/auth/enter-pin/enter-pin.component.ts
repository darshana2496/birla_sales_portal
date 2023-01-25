import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-enter-pin',
  templateUrl: './enter-pin.component.html',
  styleUrls: ['./enter-pin.component.scss'],
})
export class EnterPinComponent implements OnInit {
  enterpinGroup: FormGroup;
  encrypt: boolean = true;
  generatedPinColapse: number;
  submitted: boolean;
  disableEnteredPin: { inputType: string; disable: boolean } = {
    inputType: 'old',
    disable: false,
  };
  constructor(
    public route: Router,
    public fb: FormBuilder,
    public globalService: GlobalService,
    public storage: Storage
  ) {
    this.enterpinGroup = fb.group({
      pin1: fb.control('', Validators.required),
      pin2: fb.control({ value: '', disabled: true }, Validators.required),
      pin3: fb.control({ value: '', disabled: true }, Validators.required),
      pin4: fb.control({ value: '', disabled: true }, Validators.required),
    });
    this.enterpinGroup.valueChanges.subscribe((x) => {
      // {value:'',disabled:true}
      // this.enterpinGroup.get('pin2').disable();
      //  this.enterpinGroup.get('pin3').disable();
      //   this.enterpinGroup.get('pin4').disable();
      if (x.pin1) {
        this.enterpinGroup.get('pin2').enable({ onlySelf: true });
      }
      if (x.pin2) {
        this.enterpinGroup.get('pin3').enable({ onlySelf: true });
      }
      if (x.pin3) {
        this.enterpinGroup.get('pin4').enable({ onlySelf: true });
      }
      if (x.pin1 && x.pin2 && x.pin3 && x.pin4) {
        this.generatedPinColapse = x.pin1 + x.pin2 + x.pin3 + x.pin4;
        this.submitted = true;
        this.globalService.enteredPin = this.generatedPinColapse.toString();
      } else {
        this.submitted = false;
      }
    });
  }

  ngOnInit() {}
  changeInput() {
    this.encrypt = false;
  }
  get formErr() {
    return this.enterpinGroup.controls;
  }
  fnValidatePin() {
    this.storage.get('AccessPin').then((data: any) => {
      if (this.globalService.enteredPin == data) {
        //also used in app.comp setInitialPage()
        this.globalService.setInitialProject().then((response: any) => {});
        if (this.globalService.notificationMsg != null) {
          this.globalService.appOpenedOnlyFromNotification = true;
          setTimeout(() => {
            this.globalService.openNotificationTab();
          }, 500);
        }
        this.route.navigate(['/dashboard']);
        this.globalService.isPhoneUnlocked = true;
      } else {
        this.globalService.clearPinInputs();
        this.clearPin();
        this.globalService.universalAlert('', 'PIN incorrect', 'Ok');
      }
    });
  }
  clearPin() {
    this.enterpinGroup.reset();
  }
  fnForgetPin() {
    this.globalService.showConfirmationAlertPrompt(
      'Reset PIN',
      'Do you want to reset PIN'
    );
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-set-pin',
  templateUrl: './set-pin.component.html',
  styleUrls: ['./set-pin.component.scss'],
})
export class SetPinComponent implements OnInit {
  pinGroup: FormGroup;
  currentlyActivePage: any;
  setPin: string;
  confirmPin: string;
  storedAccessPin: string;
  compoIDfirst: string = 'first'
  compoIDsecond: string = 'second'
  unregisterBackButtonAction: any;
  encrypt: boolean = true;
  submitted: boolean;
  generatedPinColapse: number;
  constructor(public globalService: GlobalService, public fb: FormBuilder, public storage: Storage) {
    this.pinGroup = fb.group({
      pin1: fb.control('', Validators.required),
      pin2: fb.control('', Validators.required),
      pin3: fb.control('', Validators.required),
      pin4: fb.control('', Validators.required),
      pin5: fb.control('', Validators.required),
      pin6: fb.control('', Validators.required),
      pin7: fb.control('', Validators.required),
      pin8: fb.control('', Validators.required),
    })
  }

  ngOnInit() {
    console.log(this.formErr)

  }
  changeInput(index: number) {

    let controlName = 'pin' + index;
    if (index == 1 || index == 5) {

    }
    let pin1 = this.pinGroup.get('pin1').value;
    let pin2 = this.pinGroup.get('pin2').value;
    let pin3 = this.pinGroup.get('pin3').value;
    let pin4 = this.pinGroup.get('pin4').value;
    let pin5 = this.pinGroup.get('pin5').value;
    let pin6 = this.pinGroup.get('pin6').value;
    let pin7 = this.pinGroup.get('pin7').value;
    let pin8 = this.pinGroup.get('pin8').value;
    if (pin1 && pin2 && pin3 && pin4 && pin5 && pin6 && pin7 && pin8) {
      this.generatedPinColapse = pin1 + pin2 + pin3 + pin4;
      if ((pin1 == pin5) && (pin2 == pin6) && (pin3 == pin7) && (pin4 == pin8)) {
        this.submitted = true
        console.log('Pin Match Succesfully', this.submitted)
      }
      else {
        console.log('Pin UnMatch Succesfully', this.submitted)
        this.submitted = false;

      }
      console.log('last Pin Match Succesfully', this.submitted)
      console.log('Pin Success Completed')
    }
    else {
      console.log('Pin NOt Match Succesfully', this.submitted)
    }

    console.log(pin1, 'pin 1 value let', this.pinGroup.value,);
    this.encrypt = false;
  }
  keycheck(event) {
    console.log(event)
  }
  get formErr() { return this.pinGroup.controls }
  checkLength(): void {

  }
  fnsetPin() {

    console.log(this.pinGroup.value);
    this.globalService.setPinValue = this.generatedPinColapse.toString();
    this.storage.set("AccessPin", this.globalService.setPinValue);
    this.globalService.setInitialProject();
    this.globalService.isPhoneUnlocked = true;
    console.log(this.storage, this.generatedPinColapse)
  }
}

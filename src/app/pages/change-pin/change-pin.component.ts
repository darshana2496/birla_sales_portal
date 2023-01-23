import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.component.html',
  styleUrls: ['./change-pin.component.scss'],
})
export class ChangePinComponent implements OnInit {
  encrypt: boolean;
  changePinGroup: FormGroup;
  newPin: string = '';
  confirmPin: string = '';
  existingPin: any;
  accessPin: any;

  constructor(
    public globalService: GlobalService,
    public fb: FormBuilder,
    public storage: Storage
  ) {
    this.storage.get('AccessPin').then((val) => (this.accessPin = val));

    this.changePinGroup = this.fb.group({
      existingPin: this.fb.group({
        pin1: new FormControl('', [Validators.required]),
        pin2: new FormControl({ value: '', disabled: true }, [
          Validators.required,
        ]),
        pin3: new FormControl({ value: '', disabled: true }, [
          Validators.required,
        ]),
        pin4: new FormControl({ value: '', disabled: true }, [
          Validators.required,
        ]),
      }),
      newPin: this.fb.group({
        pin1: new FormControl({ value: '', disabled: true }, [
          Validators.required,
        ]),
        pin2: new FormControl({ value: '', disabled: true }, [
          Validators.required,
        ]),
        pin3: new FormControl({ value: '', disabled: true }, [
          Validators.required,
        ]),
        pin4: new FormControl({ value: '', disabled: true }, [
          Validators.required,
        ]),
      }),
      confirmPin: this.fb.group({
        pin1: new FormControl({ value: '', disabled: true }, [
          Validators.required,
        ]),
        pin2: new FormControl({ value: '', disabled: true }, [
          Validators.required,
        ]),
        pin3: new FormControl({ value: '', disabled: true }, [
          Validators.required,
        ]),
        pin4: new FormControl({ value: '', disabled: true }, [
          Validators.required,
        ]),
      }),
    });

    this.changePinGroup.get('existingPin').valueChanges.subscribe((val) => {
      if (val.pin1) {
        this.changePinGroup
          .get('existingPin')
          .get('pin2')
          .enable({ onlySelf: true });
      }
      if (val.pin2) {
        this.changePinGroup
          .get('existingPin')
          .get('pin3')
          .enable({ onlySelf: true });
      }
      if (val.pin3) {
        this.changePinGroup
          .get('existingPin')
          .get('pin4')
          .enable({ onlySelf: true });
      }
      if (val.pin4) {
        this.changePinGroup
          .get('newPin')
          .get('pin1')
          .enable({ onlySelf: true });
      }

      if (val.pin1 && val.pin2 && val.pin3 && val.pin4) {
        let existingPin = val.pin1 + val.pin2 + val.pin3 + val.pin4;
        this.existingPin = existingPin;
        if (this.existingPin == this.accessPin) {
          if (!this.isPinDifferent(this.existingPin, this.newPin)) {
            this.changePinGroup.get('newPin').setErrors({ match: false });
          } else {
            this.changePinGroup.get('newPin').updateValueAndValidity();
          }
        } else {
          this.changePinGroup.get('existingPin').setErrors({ match: false });
        }
      }
    });

    this.changePinGroup.get('newPin').valueChanges.subscribe((val) => {
      if (val.pin1) {
        this.changePinGroup
          .get('newPin')
          .get('pin2')
          .enable({ onlySelf: true });
      }
      if (val.pin2) {
        this.changePinGroup
          .get('newPin')
          .get('pin3')
          .enable({ onlySelf: true });
      }
      if (val.pin3) {
        this.changePinGroup
          .get('newPin')
          .get('pin4')
          .enable({ onlySelf: true });
      }
      if (val.pin4) {
        this.changePinGroup
          .get('confirmPin')
          .get('pin1')
          .enable({ onlySelf: true });
      }

      if (val.pin1 && val.pin2 && val.pin3 && val.pin4) {
        let newPin = val.pin1 + val.pin2 + val.pin3 + val.pin4;
        this.newPin = newPin;
        if (!this.isPinMatching(this.newPin, this.confirmPin)) {
          this.changePinGroup.get('confirmPin').setErrors({ match: false });
        } else {
          this.changePinGroup.get('confirmPin').updateValueAndValidity();
        }
        if (!this.isPinDifferent(this.existingPin, this.newPin)) {
          this.changePinGroup.get('newPin').setErrors({ match: false });
        } else {
          this.changePinGroup.get('newPin').updateValueAndValidity();
        }
      }
    });

    this.changePinGroup.get('confirmPin').valueChanges.subscribe((val) => {
      if (val.pin1) {
        this.changePinGroup
          .get('confirmPin')
          .get('pin2')
          .enable({ onlySelf: true });
      }
      if (val.pin2) {
        this.changePinGroup
          .get('confirmPin')
          .get('pin3')
          .enable({ onlySelf: true });
      }
      if (val.pin3) {
        this.changePinGroup
          .get('confirmPin')
          .get('pin4')
          .enable({ onlySelf: true });
      }
      if (val.pin1 && val.pin2 && val.pin3 && val.pin4) {
        let confirmPin = val.pin1 + val.pin2 + val.pin3 + val.pin4;
        this.confirmPin = confirmPin;
        if (!this.isPinMatching(this.newPin, this.confirmPin)) {
          this.changePinGroup.get('confirmPin').setErrors({ match: false });
        }
      }
    });
  }

  ngOnInit() {}

  get f() {
    return this.changePinGroup.controls;
  }

  isPinMatching(pin1: any, pin2: any) {
    if (pin1 == pin2) {
      return true;
    } else {
      return false;
    }
  }

  isPinDifferent(pin1: any, pin2: any) {
    if (pin1 != pin2) {
      return true;
    } else {
      return false;
    }
  }

  changeInput() {
    this.encrypt = false;
  }

  proceed() {
    if (this.changePinGroup) {
      this.storage.set('AccessPin', this.newPin);
      this.globalService.universalAlert('', 'New PIN set successfully', 'Ok');
    }
  }
}

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.component.html',
  styleUrls: ['./change-pin.component.scss'],
})
export class ChangePinComponent implements OnInit {
  encrypt: boolean;
  changePinGroup: FormGroup;

  constructor(public globalService: GlobalService, public fb: FormBuilder) {
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
    });
  }

  ngOnInit() {}

  changeInput() {
    this.encrypt = false;
  }
}

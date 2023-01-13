import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-set-pin',
  templateUrl: './set-pin.component.html',
  styleUrls: ['./set-pin.component.scss'],
})
export class SetPinComponent implements OnInit {
  pinGroup: FormGroup;  
  encrypt: boolean = true;
  submitted: boolean;
  generatedPinColapse: number;
  constructor(public route:Router,public globalService: GlobalService, public fb: FormBuilder, public storage: Storage) {
    this.pinGroup = fb.group({
      pin1: fb.control('', Validators.required),
      pin2: fb.control({value:'',disabled:true}, Validators.required),
      pin3: fb.control({value:'',disabled:true}, Validators.required),
      pin4: fb.control({value:'',disabled:true}, Validators.required),
      pin5: fb.control({value:'',disabled:true}, Validators.required),
      pin6: fb.control({value:'',disabled:true}, Validators.required),
      pin7: fb.control({value:'',disabled:true}, Validators.required),
      pin8: fb.control({value:'',disabled:true}, Validators.required),
    })

    this.pinGroup.valueChanges.subscribe(val => {
      if(val.pin1){
        this.pinGroup.get('pin2').enable({onlySelf:true}); 
      }
      if(val.pin2)
      {
        this.pinGroup.get('pin3').enable({onlySelf:true}); 
      }
      if(val.pin3){
        this.pinGroup.get('pin4').enable({onlySelf:true}); 
      }
      if(val.pin4){
        this.pinGroup.get('pin5').enable({onlySelf:true}); 
      }
      if(val.pin5){
        this.pinGroup.get('pin6').enable({onlySelf:true}); 
      }
      if(val.pin6){
        this.pinGroup.get('pin7').enable({onlySelf:true}); 
      }
      if(val.pin7){
        this.pinGroup.get('pin8').enable({onlySelf:true}); 
      }
    if (val.pin1 && val.pin2 && val.pin3 && val.pin4 && val.pin5 && val.pin6 && val.pin7 && val.pin8) {
      this.generatedPinColapse = val.pin1 + val.pin2 + val.pin3 + val.pin4;
      if ((val.pin1 == val.pin5) && (val.pin2 == val.pin6) && (val.pin3 == val.pin7) && (val.pin4 == val.pin8)) {
        this.submitted = true;
      }
      else {
        this.submitted = false;
      }
    }
    else {
      this.submitted = false;
    }
   
    })
  }

  ngOnInit() {


  }
  changeInput() {
    this.encrypt = false;
  }
  get formErr() { return this.pinGroup.controls }
  checkLength(): void {

  }
  fnsetPin() {
    this.globalService.setPinValue = this.generatedPinColapse.toString();
    this.storage.set("AccessPin", this.globalService.setPinValue);
    this.globalService.setInitialProject();
    this.globalService.isPhoneUnlocked = true;
    this.route.navigate(['/enter-pin']);
  }
}

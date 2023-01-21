import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';
import { Storage } from '@ionic/storage';
import { Device as device } from '@capacitor/device';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-thank-you-modal',
  templateUrl: './thank-you-modal.component.html',
  styleUrls: ['./thank-you-modal.component.scss'],
})
export class ThankYouModalComponent implements OnInit {
  myform: FormGroup;
  disableBtn: boolean = true;
  deviceId:any;
  devicePlatform:any;
  deviceVersion:any;
  deviceModel:any;
  deviceSerial:any;
  deviceManu:any;
  constructor(public navCtrl: NavController, public globalService: GlobalService, public storage: Storage,public fb:FormBuilder) {
    this.myform=fb.group({
      exp: fb.control('',Validators.required),
      comment:fb.control('',Validators.required),
    })
    this.myform.valueChanges.subscribe(values => {
      console.log(values)
      if (values.exp == "" || values.comment == "") {
        this.disableBtn = true;
      } else {
        this.disableBtn = false;
      }
      console.log(this.disableBtn);
    });
   }

  ngOnInit() {
    device.getInfo().then(x=>{
      console.log(x,'Device Innfo');
      this.deviceModel=x.model;
      this.devicePlatform=x.platform;
      this.deviceSerial=""
      this.deviceVersion=x.osVersion
      this.deviceManu=x.manufacturer
    })
    .catch(e=>{

    })
    device
    .getId()
    .then((val) => {
      console.log(val);
      this.deviceId=val.uuid;
    })
    .catch((e) => {
      console.log(e);
    });
  }
  submitData() {  
    

    let object = {
      "vcCustomerID": this.globalService.customerId,
      "vcDeviceDetail": this.deviceVersion,
      "vcType": this.myform.get('exp').value,
      "vcQuery": this.myform.get('comment').value,
      "vcDeviceModel": this.deviceModel,
      "vcPlatform": this.devicePlatform,
      "vcUuid": this.deviceId,
      "vcSerial": this.deviceSerial,
      "vcManufacturer": this.deviceManu,
      "vcLastUpdatedIp": this.globalService.deviceIP
    }


    this.globalService.postFeedback(object).then((response: any) => {
      console.log(response);
      if (response.btIsSuccess) {
        this.storage.set("AppReviewed", true);
        this.globalService.isAppReviewed = true;
        this.globalService.universalAlert("Feedback sent", "Thanks, for sharing your feedback.", "Ok");
    //      let animations:AnimationOptions={
    //   animated: true,
    //   animationDirection: "back"
    // }
    // this.navCtrl.back(animations)
      } else {

      }
    }).catch((response: any) => {
      console.log(response);
    })
  }
  closePage(){
    let animations:AnimationOptions={
      animated: true,
      animationDirection: "back"
    }
    this.navCtrl.back(animations)
  }

}

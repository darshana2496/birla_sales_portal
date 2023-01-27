import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-thank-you-modal',
  templateUrl: './thank-you-modal.component.html',
  styleUrls: ['./thank-you-modal.component.scss'],
})
export class ThankYouModalComponent implements OnInit {
  myform: FormGroup;
  disableBtn: boolean = true;

  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    public globalService: GlobalService,
    public storage: Storage,
    public fb: FormBuilder,
    public device: Device
  ) {
    this.myform = fb.group({
      exp: fb.control('', Validators.required),
      comment: fb.control('', Validators.required),
    });
    this.myform.valueChanges.subscribe((values) => {
      console.log(values);
      if (values.exp == '' || values.comment == '') {
        this.disableBtn = true;
      } else {
        this.disableBtn = false;
      }
      console.log(this.disableBtn);
    });
  }

  ngOnInit() {}
  async submitData() {
    let object = {
      vcCustomerID: this.globalService.customerId,
      vcDeviceDetail: this.device.version,
      vcType: this.myform.get('exp').value,
      vcQuery: this.myform.get('comment').value,
      vcDeviceModel: this.device.model,
      vcPlatform: this.device.platform,
      vcUuid: this.device.uuid,
      vcSerial: this.device.serial,
      vcManufacturer: this.device.manufacturer,
      vcLastUpdatedIp: this.globalService.deviceIP,
    };

    this.globalService
      .postFeedback(object)
      .then((response: any) => {
        console.log(response);
        if (response.btIsSuccess) {
          this.storage.set('AppReviewed', true);
          this.globalService.isAppReviewed = true;
          this.globalService.universalAlert(
            'Feedback sent',
            'Thanks, for sharing your feedback.',
            'Ok'
          );
          //      let animations:AnimationOptions={
          //   animated: true,
          //   animationDirection: "back"
          // }
          // this.navCtrl.back(animations)
        } else {
        }
      })
      .catch((response: any) => {
        console.log(response);
      });
    const modal = await this.modalCtrl.getTop();
    modal.dismiss();
  }
  async closePage() {
    // let animations:AnimationOptions={
    //   animated: true,
    //   animationDirection: "back"
    // }
    // this.navCtrl.back(animations)
    const modal = await this.modalCtrl.getTop();
    modal.dismiss();
  }
}

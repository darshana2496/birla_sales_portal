import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-notification',
  templateUrl: 'notification.page.html',
  styleUrls: ['notification.page.scss'],
})
export class NotificationPage implements OnInit {
  public static pageName = "NotificationPage";
  notificationList: any = [];
  constructor(public globalService: GlobalService) {}
  ngOnInit(): void {
    this.globalService.getNotifications().then((response: any) => {
      if (response.btIsSuccess) {
        this.notificationList = response.object;
        this.updateNotification();
      }
      else {
        this.notificationList = [];
      }
    }).catch((response: any) => {

    })
  }
  updateNotification() {
    this.globalService.updateCustomerNotification().then((response:any) => {
      console.log(response);
    }).catch((response: any)=> {

    })
  }
}

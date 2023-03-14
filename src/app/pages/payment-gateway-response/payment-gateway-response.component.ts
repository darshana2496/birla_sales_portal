import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { GlobalService } from '../../services/global.service';
@Component({
  selector: 'app-payment-gateway-response',
  templateUrl: './payment-gateway-response.component.html',
  styleUrls: ['./payment-gateway-response.component.scss'],
})
export class PaymentGatewayResponseComponent implements OnInit {
  paymentResponse: any;

  response: any = {
    vcDescription: 'Payment verification failed',
    btIsSuccess: false,
    object:
      'Payment verification failed. <br /><br />Transaction Number: order_FoQmKcvMlx3FXT <br /><br />We are temporary unable to process your transaction, Please contact your bank/payment service provider in case the amount has been deducted from your account. In case of the failure at our end the amount will be credited bank to the source of payment in the next 10 days.<br /><br />',
    vcTitle: null,
  };

  isSuccess: boolean = false;

  constructor(
    public modalCtrl: ModalController,
    private navParams: NavParams,
    public globalService: GlobalService,
    public router: Router
  ) {}

  ngOnInit() {
    this.paymentResponse = this.navParams.data;
    if (this.paymentResponse.btIsSuccess) {
      this.isSuccess = true;
    }
  }

  async close() {
    const modal = await this.modalCtrl.getTop();
    modal.dismiss();
  }
  gotoDashboard() {
    this.close();
    this.router.navigate(['/dashboard']);
  }
}

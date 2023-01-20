import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { IPaymentFutureData, IPaymentPendingData } from 'src/app/utilities/constants/commonInterface';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
  public static pageName = "PaymentsPage";
  CustomerSegment: string = "next";
  serverError: boolean = false;

  pendingData: IPaymentPendingData = {
    vcTotalinvoiceraised: "0",
    vcTotalinvoiceraisedconverted: "0",
    vcTotaloutstanding: "0",
    vcTotaloutstandingconverted: "0",
    vcTotalreceived: "0",
    vcTotalreceivedconverted: "0",
  };
  futureData: IPaymentFutureData = {
    intTotalpendinginstallment: "0",
    vcTotalamountpayable: "0",
    vcTotalamountpayableconverted: "0",
    customerPortal_SubFuturePaymentModelList: [],
  };
  pastData: any = [];

  checkDrop: any = {
    'buttonName': 'CHEQUE DROP LOCATIONS',
    'type': 'cheque',
  }

  payOnline: any = {
    'buttonName': 'PAY ONLINE',
    'type': 'online',
  }

  addDropLocation: any = {
    'buttonName': 'CHEQUE ALREADY DROPPED ?',
    'type': 'online',
  }

  noPendingData: any = {
    "vcTotalinvoiceraised": "0",
    "vcTotalinvoiceraisedconverted": "0",
    "vcTotaloutstanding": "0",
    "vcTotaloutstandingconverted": "0",
    "vcTotalreceived": "0",
    "vcTotalreceivedconverted": "0",
  };
  noFutureData: any = {
    "intTotalpendinginstallment": "0",
    "vcTotalamountpayable": "0",
    "vcTotalamountpayableconverted": "0",
    "customerPortal_SubFuturePaymentModelList": [],
  };

  MakePaymentsPage: any = {
    'outstandingPayment': 0
  }

  noPastData: any = [];
  vcOptIn: any;
  vcOptOut: any;
  disableBtn: boolean;
  constructor(public globalService: GlobalService,public route : Router) { }

  ngOnInit() {
    this.globalService.getPaymentData().then((response: any) => {
      console.log(response);
      if (response.btIsSuccess) {
        let data = response.object;

        this.vcOptIn = data.vcOptIn
        this.vcOptOut = data.vcOptOut

        data.objCustomerPortal_PendingPaymentModel.vcTotalinvoiceraised = this.globalService.decrypt(this.globalService.encryptSecretKey, data.objCustomerPortal_PendingPaymentModel.vcTotalinvoiceraised);
        data.objCustomerPortal_PendingPaymentModel.vcTotalinvoiceraisedconverted = this.globalService.decrypt(this.globalService.encryptSecretKey, data.objCustomerPortal_PendingPaymentModel.vcTotalinvoiceraisedconverted);
        data.objCustomerPortal_PendingPaymentModel.vcTotalreceived = this.globalService.decrypt(this.globalService.encryptSecretKey, data.objCustomerPortal_PendingPaymentModel.vcTotalreceived);
        data.objCustomerPortal_PendingPaymentModel.vcTotalreceivedconverted = this.globalService.decrypt(this.globalService.encryptSecretKey, data.objCustomerPortal_PendingPaymentModel.vcTotalreceivedconverted);
        data.objCustomerPortal_PendingPaymentModel.vcTotaloutstanding = this.globalService.decrypt(this.globalService.encryptSecretKey, data.objCustomerPortal_PendingPaymentModel.vcTotaloutstanding);
        data.objCustomerPortal_PendingPaymentModel.vcTotaloutstandingconverted = this.globalService.decrypt(this.globalService.encryptSecretKey, data.objCustomerPortal_PendingPaymentModel.vcTotaloutstandingconverted);


        data.customerPortal_FuturePaymentModel.vcTotalamountpayable = this.globalService.decrypt(this.globalService.encryptSecretKey, data.customerPortal_FuturePaymentModel.vcTotalamountpayable);
        data.customerPortal_FuturePaymentModel.vcTotalamountpayableconverted = this.globalService.decrypt(this.globalService.encryptSecretKey, data.customerPortal_FuturePaymentModel.vcTotalamountpayableconverted);

        data.customerPortal_FuturePaymentModel.customerPortal_SubFuturePaymentModelList.forEach((element, index) => {
          data.customerPortal_FuturePaymentModel.customerPortal_SubFuturePaymentModelList[index].vcPaymentpercent = this.globalService.decrypt(this.globalService.encryptSecretKey, element.vcPaymentpercent)
          data.customerPortal_FuturePaymentModel.customerPortal_SubFuturePaymentModelList[index].vcAmountpayable = this.globalService.decrypt(this.globalService.encryptSecretKey, element.vcAmountpayable)
          data.customerPortal_FuturePaymentModel.customerPortal_SubFuturePaymentModelList[index].vcaAmountpayableconverted = this.globalService.decrypt(this.globalService.encryptSecretKey, element.vcaAmountpayableconverted)
          data.customerPortal_FuturePaymentModel.customerPortal_SubFuturePaymentModelList[index].vcDescription = this.globalService.decrypt(this.globalService.encryptSecretKey, element.vcDescription)
        });

        data.customerPortal_PastPaymentModelList.forEach((element, index) => {
          data.customerPortal_PastPaymentModelList[index].vcPaymentDate = this.globalService.decrypt(this.globalService.encryptSecretKey, element.vcPaymentDate)
          data.customerPortal_PastPaymentModelList[index].vcAmountpaid = this.globalService.decrypt(this.globalService.encryptSecretKey, element.vcAmountpaid)
          data.customerPortal_PastPaymentModelList[index].vcPaymentMode = this.globalService.decrypt(this.globalService.encryptSecretKey, element.vcPaymentMode)
          data.customerPortal_PastPaymentModelList[index].vcPaymentTowards = this.globalService.decrypt(this.globalService.encryptSecretKey, element.vcPaymentTowards)
          data.customerPortal_PastPaymentModelList[index].vcChequeDetail = this.globalService.decrypt(this.globalService.encryptSecretKey, element.vcChequeDetail)
        });

        console.log("Payment response object ", data);
        if (data.objCustomerPortal_PendingPaymentModel == null) {
          this.pendingData = this.noPendingData;
        } else {
          this.pendingData = data.objCustomerPortal_PendingPaymentModel;
          this.MakePaymentsPage.outstandingPayment = this.pendingData.vcTotaloutstanding;
          console.log("OUTSTANDING AMOUNT IS===========>>", this.pendingData.vcTotaloutstanding)
          if (this.MakePaymentsPage.outstandingPayment && this.MakePaymentsPage.outstandingPayment != null && this.MakePaymentsPage.outstandingPayment != 'N/A' && this.MakePaymentsPage.outstandingPayment != "NIL") {
            this.disableBtn = true;
          } else {
            this.disableBtn = false
          }
        }

        if (data.customerPortal_FuturePaymentModel == null) {
          this.futureData = this.noFutureData;
        } else {
          data.customerPortal_FuturePaymentModel.customerPortal_SubFuturePaymentModelList.map((obj) => {
            if (obj.vcAmountpayable != null || obj.vcAmountpayable != undefined) {
              if (typeof obj.vcAmountpayable == "string")
                obj.vcAmountpayable = Math.round(Number(obj.vcAmountpayable)).toString();
            }
          });
          this.futureData = data.customerPortal_FuturePaymentModel;
        }

        if (data.customerPortal_PastPaymentModelList == null) {
          this.pastData = this.noPastData;
        } else {
          data.customerPortal_PastPaymentModelList.map((obj) => {
            if (obj.vcAmountpaid != null || obj.vcAmountpaid != undefined) {
              if (typeof obj.vcAmountpaid == "string")
                obj.vcAmountpaid = Math.round(Number(obj.vcAmountpaid)).toString();
            }
          });
          this.pastData = data.customerPortal_PastPaymentModelList;
        }
      } else {
        this.serverError = true;
      }
    }).catch((response: any) => {
      console.log(response);
    })
  }
  shareFile(){

  }
  dropCheque(){
  this.route.navigate(['/cheque-drop'])
  }
  makePayment(){
   if(this.MakePaymentsPage.outstandingPayment > 0){
     this.route.navigate(['/make-payment'])
   }
  }
  chequeDetailpage(){
    this.route.navigate(['/cheque-detail-drop'])
  }
}

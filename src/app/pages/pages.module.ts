import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';

import { CommonComponentsModule } from './../common-components/common-components.module';
import { TermsUsePage } from './terms-use/terms-use.component';
import { TermNConditionPage } from './term-n-condition/term-n-condition.component';
import { RefundCancelationPage } from './refund-cancelation/refund-cancelation.component';
import { PrivacyPolicyPage } from './privacy-policy/privacy-policy.component';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { ChangePinComponent } from './change-pin/change-pin.component';
import { PagesComponent } from './pages.page';
import { AboutComponent } from './about/about.component';
import { HelpSupportComponent } from './help-support/help-support.component';
import { FaqComponent } from './faq/faq.component';
import { FeedbackQueryComponent } from './feedback-query/feedback-query.component';
import { ChequeDropComponent } from './cheque-drop/cheque-drop.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { ChequeDetailDropComponent } from './cheque-detail-drop/cheque-detail-drop.component';
import { CallsComponent } from './calls/calls.component';
import { ThankYouModalComponent } from './thank-you-modal/thank-you-modal.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AddedProjectSuccessComponent } from './added-project-success/added-project-success.component';
import { PipesModule } from '../utilities/pipes/pipes.module';
import { SelectCustomerComponent } from './select-customer/select-customer.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { PaymentGatewayResponseComponent } from './payment-gateway-response/payment-gateway-response.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CommonComponentsModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    IonicSelectableModule
  ],
  declarations: [
    PagesComponent,
    FormLayoutComponent,
    PrivacyPolicyPage,
    RefundCancelationPage,
    TermNConditionPage,
    ChangePinComponent,
    TermsUsePage,
    AboutComponent,
    HelpSupportComponent,
    FaqComponent,
    FeedbackQueryComponent,
    ChequeDropComponent,
    MakePaymentComponent,
    ChequeDetailDropComponent,
    CallsComponent,
    ThankYouModalComponent,
    AddProjectComponent,
    AddedProjectSuccessComponent,
    SelectCustomerComponent,
    PaymentGatewayResponseComponent,
  ],
  providers:[SocialSharing]
})
export class PagesModule {}

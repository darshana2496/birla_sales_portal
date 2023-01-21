import { FormLayoutComponent } from './form-layout/form-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.page';
import { PrivacyPolicyPage } from './privacy-policy/privacy-policy.component';
import { TermsUsePage } from './terms-use/terms-use.component';
import { TermNConditionPage } from './term-n-condition/term-n-condition.component';
import { RefundCancelationPage } from './refund-cancelation/refund-cancelation.component';
import { ChangePinComponent } from './change-pin/change-pin.component';
import { AboutComponent } from './about/about.component';
import { HelpSupportComponent } from './help-support/help-support.component';
import { FaqComponent } from './faq/faq.component';
import { FeedbackQueryComponent } from './feedback-query/feedback-query.component';
import { ChequeDropComponent } from './cheque-drop/cheque-drop.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { ChequeDetailDropComponent } from './cheque-detail-drop/cheque-detail-drop.component';
import { CallsComponent } from './calls/calls.component';
import { ThankYouModalComponent } from './thank-you-modal/thank-you-modal.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./tabs/tabs.module').then((m) => m.TabsPageModule),
      },
      {
        path: 'about-birla',
        component: AboutComponent,
      },
      {
        path: 'help-support',
        component: HelpSupportComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
      {
        path:'cheque-drop',component:ChequeDropComponent
      },
      {
        path:'thank-modal',component:ThankYouModalComponent
      },
      {
        path:'make-payment',component:MakePaymentComponent},
      {
        path:'cheque-detail-drop',component:ChequeDetailDropComponent
      },
      {
        path:'calls',component:CallsComponent
      },
      {
        path: 'feedback-query',
        component: FeedbackQueryComponent,
      },
      {
        path: 'refundcancel',
        component: RefundCancelationPage,
      },
      {
        path: 'termscondition',
        component: TermNConditionPage,
      },
      {
        path: 'termuse',
        component: TermsUsePage,
      },
      {
        path: 'privacypolicy',
        component: PrivacyPolicyPage,
      },
      {
        path: 'formLayout',
        component: FormLayoutComponent,
      },
      {
        path: 'change-pin',
        component: ChangePinComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PagesRoutingModule {}

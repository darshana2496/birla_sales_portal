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

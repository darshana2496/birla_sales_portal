import { FormLayoutComponent } from './form-layout/form-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.page';
import { PrivacyPolicyPage } from './privacy-policy/privacy-policy.component';
import { TermsUsePage } from './terms-use/terms-use.component';
import { TermNConditionPage } from './term-n-condition/term-n-condition.component';
import { RefundCancelationPage } from './refund-cancelation/refund-cancelation.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (m) => m.DashBoardPageModule
          ),
      },
      {
        path: 'vault',
        loadChildren: () =>
          import('./vault/vault.module').then((m) => m.VaultPageModule),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./notification/notification.module').then(
            (m) => m.NotificationPageModule
          ),
      },
      {
        path: 'payments',
        loadChildren: () =>
          import('./payments/payments.module').then(
            (m) => m.PaymentsPageModule
          ),
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

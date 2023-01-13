import { PrivacyPolicyPage } from './privacy-policy/privacy-policy.component';
import { TermsUsePage } from './terms-use/terms-use.component';
import { TermNConditionPage } from './term-n-condition/term-n-condition.component';
import { RefundCancelationPage } from './refund-cancelation/refund-cancelation.component';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.page';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./tab1/dashboard.module').then(m => m.DashBoardPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path:'refundcancel',
        component: RefundCancelationPage
        },
        {
          path: 'termscondition',
          component: TermNConditionPage
        },
        {
          path: 'termuse',
          component: TermsUsePage
        },
        {
          path:'privacypolicy',
          component: PrivacyPolicyPage
        },
        {
          path:'formLayout',
          component: FormLayoutComponent      
        },
    ]
  },
  {
    path: '',
    redirectTo: '/tab1',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PagesRoutingModule {}

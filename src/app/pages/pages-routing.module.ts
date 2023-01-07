import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.page';


const routes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
      },{
      path:'refundcancel',
      loadChildren: () => import('./refund-cancelation/refund-cancelation.module').then(m => m.RefundCancelationPageModule)
      },
      {
        path: 'termscondition',
        loadChildren:()=>import('./term-n-condition/term-n-condition.module').then(m=>m.TermNConditionPageModule)
      },
      {
        path: 'termuse',
        loadChildren:()=>import('./terms-use/terms-use.module').then(m=>m.TermsUsePageModule),
      },
      {
        path:'privacypolicy',
        loadChildren:()=>import('./privacy-policy/privacy-policy.module').then(m=>m.PrivacyPolicyPageModule),      },
      {
        path: '',
        redirectTo: '/pages/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/pages/tab1',
    pathMatch: 'full'
  },
  {
    path: 'term-n-condition',
    loadChildren: () => import('./term-n-condition/term-n-condition.module').then( m => m.TermNConditionPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'refund-cancelation',
    loadChildren: () => import('./refund-cancelation/refund-cancelation.module').then( m => m.RefundCancelationPageModule)
  },
  {
    path: 'terms-use',
    loadChildren: () => import('./terms-use/terms-use.module').then( m => m.TermsUsePageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PagesRoutingModule {}

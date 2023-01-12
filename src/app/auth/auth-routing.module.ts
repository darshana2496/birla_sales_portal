import { LandingPage } from './landing/landing.component';
import { KnowYourCustIdPage } from './know-your-cust-id/know-your-cust-id.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppIntroPage } from './app-intro/app-intro.component';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SetPinComponent } from './set-pin/set-pin.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: 'AppIntroPage',
    component: AppIntroPage
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'know-your-cust-id',
    component: KnowYourCustIdPage
  },
  {
    path: 'landing',
    component: LandingPage
  },
  {
    path:'loginwithcustid',
    loadChildren:()=>import('./login-with-cust-id/login-with-cust-id.module').then(m=>m.LoginWithCustIdPageModule)
  },
  {
    path: '',
    redirectTo: 'AppIntroPage',
    pathMatch: 'full'
  },
  {
    path:'set-pin',
    component:SetPinComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

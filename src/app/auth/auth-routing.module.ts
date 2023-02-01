import { OtpComponent } from './otp/otp.component';
import { LoginWithCustIdPage } from './login-with-cust-id/login-with-cust-id.component';
import { LandingPage } from './landing/landing.component';
import { KnowYourCustIdPage } from './know-your-cust-id/know-your-cust-id.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppIntroPage } from './app-intro/app-intro.component';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SetPinComponent } from './set-pin/set-pin.component';
import { EnterPinComponent } from './enter-pin/enter-pin.component';
import { LoginWithUnamenpassComponent } from './login-with-unamenpass/login-with-unamenpass.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'AppIntroPage',
        component: AppIntroPage,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'know-your-cust-id',
        component: KnowYourCustIdPage,
      },
      {
        path:'login-with-uname',component:LoginWithUnamenpassComponent
      },
      {
        path: 'landing',
        component: LandingPage,
      },
      {
        path: 'loginwithcustid',
        component: LoginWithCustIdPage,
      },
      {
        path: 'otp',
        component: OtpComponent,
      },
      {
        path: 'set-pin',
        component: SetPinComponent,
      },
      {
        path: 'enter-pin',
        component: EnterPinComponent,
      },
      {
        path: '',
        redirectTo: 'AppIntroPage',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'AppIntroPage',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

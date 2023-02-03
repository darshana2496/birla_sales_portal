import { LandingPage } from './landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppIntroPage } from './app-intro/app-intro.component';
import { AuthComponent } from './auth.component';
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
        path: 'login-with-uname',
        component: LoginWithUnamenpassComponent,
      },
      {
        path: 'landing',
        component: LandingPage,
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

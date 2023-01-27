import { EncryptNumberPipe } from './../utilities/pipes/encrypt-number';
import { OtpComponent } from './otp/otp.component';
import { LoginWithCustIdPage } from './login-with-cust-id/login-with-cust-id.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonComponentsModule } from './../common-components/common-components.module';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { AppIntroPage } from './app-intro/app-intro.component';
import { KnowYourCustIdPage } from './know-your-cust-id/know-your-cust-id.component';
import { LandingPage } from './landing/landing.component';
import { SetPinComponent } from './set-pin/set-pin.component';
import { OnlyNumberDirective } from '../utilities/directives/only-number.directive';
import { EnterPinComponent } from './enter-pin/enter-pin.component';
import { PipesModule } from '../utilities/pipes/pipes.module';
import { Device } from '@awesome-cordova-plugins/device/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonComponentsModule,
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    AppIntroPage,
    KnowYourCustIdPage,
    LandingPage,
    LoginWithCustIdPage,
    OtpComponent,

    SetPinComponent,
    OnlyNumberDirective,
    EnterPinComponent,
  ],
  providers: [EncryptNumberPipe, Device],
})
export class AuthModule {}

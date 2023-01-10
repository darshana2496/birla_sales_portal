import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginWithCustIdPageRoutingModule } from './login-with-cust-id-routing.module';

import { LoginWithCustIdPage } from './login-with-cust-id.page';
import { CommonComponentsModule } from '../../../app/common-components/common-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginWithCustIdPageRoutingModule,
    CommonComponentsModule
  ],
  declarations: [LoginWithCustIdPage]
})
export class LoginWithCustIdPageModule {}

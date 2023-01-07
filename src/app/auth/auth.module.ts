import { CommonComponentsModule } from './../common-components/common-components.module';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    CommonComponentsModule,
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    IonicModule
  ]
})
export class AuthModule { }

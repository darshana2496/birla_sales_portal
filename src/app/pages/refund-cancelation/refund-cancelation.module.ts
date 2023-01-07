import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RefundCancelationPageRoutingModule } from './refund-cancelation-routing.module';

import { RefundCancelationPage } from './refund-cancelation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RefundCancelationPageRoutingModule
  ],
  declarations: [RefundCancelationPage]
})
export class RefundCancelationPageModule {}

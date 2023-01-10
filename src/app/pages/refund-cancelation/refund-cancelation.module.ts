import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RefundCancelationPageRoutingModule } from './refund-cancelation-routing.module';

import { RefundCancelationPage } from './refund-cancelation.page';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RefundCancelationPageRoutingModule,
    CommonComponentsModule
  ],
  declarations: [RefundCancelationPage]
})
export class RefundCancelationPageModule {}

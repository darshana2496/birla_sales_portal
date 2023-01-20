import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentsPageRoutingModule } from './payments-routing.module';

import { PaymentsPage } from './payments.page';

import { PipesModule } from 'src/app/utilities/pipes/pipes.module';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentsPageRoutingModule,PipesModule,CommonComponentsModule
  ],
  declarations: [PaymentsPage]
})
export class PaymentsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermNConditionPageRoutingModule } from './term-n-condition-routing.module';

import { TermNConditionPage } from './term-n-condition.page';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermNConditionPageRoutingModule,
    CommonComponentsModule
  ],
  declarations: [TermNConditionPage]
})
export class TermNConditionPageModule {}

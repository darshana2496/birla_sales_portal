import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsUsePageRoutingModule } from './terms-use-routing.module';

import { TermsUsePage } from './terms-use.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsUsePageRoutingModule
  ],
  declarations: [TermsUsePage]
})
export class TermsUsePageModule {}

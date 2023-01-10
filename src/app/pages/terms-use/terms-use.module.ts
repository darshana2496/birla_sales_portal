import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsUsePageRoutingModule } from './terms-use-routing.module';

import { TermsUsePage } from './terms-use.page';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsUsePageRoutingModule,
    CommonComponentsModule
  ],
  declarations: [TermsUsePage]
})
export class TermsUsePageModule {}

import { CommonComponentsModule } from './../common-components/common-components.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';

import { TermsUsePage } from './terms-use/terms-use.component';
import { TermNConditionPage } from './term-n-condition/term-n-condition.component';
import { RefundCancelationPage } from './refund-cancelation/refund-cancelation.component';
import { PrivacyPolicyPage } from './privacy-policy/privacy-policy.component';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { PagesComponent } from './pages.page';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    PagesComponent,
    FormLayoutComponent,
    PrivacyPolicyPage,
    RefundCancelationPage,
    TermNConditionPage,
    TermsUsePage,
    AboutComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CommonComponentsModule,
    PagesRoutingModule,
  ],
})
export class PagesModule {}

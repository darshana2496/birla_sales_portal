import { FormLayoutComponent } from './form-layout/form-layout.component';
import { CommonComponentsModule } from './../common-components/common-components.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.page';
import { PrivacyPolicyPageModule } from './privacy-policy/privacy-policy.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CommonComponentsModule,
    PagesRoutingModule,
    PrivacyPolicyPageModule,
  ],
  declarations: [PagesComponent, FormLayoutComponent]
})
export class PagesModule {}

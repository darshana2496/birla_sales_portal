import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutBirlaPageRoutingModule } from './about-birla-routing.module';

import { AboutBirlaPage } from './about-birla.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutBirlaPageRoutingModule
  ],
  declarations: [AboutBirlaPage]
})
export class AboutBirlaPageModule {}

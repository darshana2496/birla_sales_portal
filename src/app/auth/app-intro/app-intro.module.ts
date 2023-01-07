import { CommonComponentsModule } from '../../common-components/common-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppIntroPageRoutingModule } from './app-intro-routing.module';

import { AppIntroPage } from './app-intro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppIntroPageRoutingModule,
    CommonComponentsModule
  ],
  declarations: [AppIntroPage]
})
export class AppIntroPageModule {}

import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationPage } from './notification.page';

import { NotificationPageRoutingModule } from './notification-routing.module';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NotificationPageRoutingModule,
    CommonComponentsModule
  ],
  declarations: [NotificationPage],
})
export class NotificationPageModule {}

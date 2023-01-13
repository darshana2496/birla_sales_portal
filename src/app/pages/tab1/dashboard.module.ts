import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashBoard } from './dashboard.page';

import { DashBoardRoutingModule } from './dashboard-routing.module';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DashBoardRoutingModule,CommonComponentsModule
  ],

  declarations: [DashBoard]
})
export class DashBoardPageModule {}

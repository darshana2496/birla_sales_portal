import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashBoard } from './dashboard.page';

import { DashBoardRoutingModule } from './dashboard-routing.module';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { DefaultImagePipe } from 'src/app/utilities/pipes/default-image';
import { CurrencyDisplayPipe } from 'src/app/utilities/pipes/currency-display';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DashBoardRoutingModule,CommonComponentsModule
  ],
  exports: [DefaultImagePipe,CurrencyDisplayPipe],
  declarations: [DashBoard,DefaultImagePipe,CurrencyDisplayPipe]
})
export class DashBoardPageModule {}

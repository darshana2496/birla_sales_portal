import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashBoard } from './dashboard.page';

import { DashBoardRoutingModule } from './dashboard-routing.module';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { DefaultImagePipe } from 'src/app/utilities/pipes/default-image';
import { CurrencyDisplayPipe } from 'src/app/utilities/pipes/currency-display';
import { PipesModule } from 'src/app/utilities/pipes/pipes.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DashBoardRoutingModule,CommonComponentsModule,PipesModule
  ],
 
  declarations: [DashBoard]
})
export class DashBoardPageModule {}

import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.page';

@NgModule({
  imports: [
    PagesRoutingModule,
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [PagesComponent]
})
export class PagesModule {}

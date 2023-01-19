import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VaultPage } from './vault.page';

import { VaultPageRoutingModule } from './vault-routing.module';
import { CommonComponentsModule } from '../../common-components/common-components.module';
import { SearchFilterPipe } from 'src/app/utilities/pipes/search-filter';

@NgModule({
  declarations: [VaultPage,SearchFilterPipe],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    VaultPageRoutingModule,
    CommonComponentsModule,
  ],
})
export class VaultPageModule {}

import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VaultPage } from './vault.page';

import { VaultPageRoutingModule } from './vault-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, VaultPageRoutingModule],
  declarations: [VaultPage],
})
export class VaultPageModule {}

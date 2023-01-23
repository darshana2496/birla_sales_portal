import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VaultPage } from './vault.page';

import { VaultPageRoutingModule } from './vault-routing.module';
import { CommonComponentsModule } from '../../common-components/common-components.module';
import { PipesModule } from 'src/app/utilities/pipes/pipes.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@NgModule({
  declarations: [VaultPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    VaultPageRoutingModule,
    CommonComponentsModule,PipesModule
  ],
  providers:[SocialSharing]
})
export class VaultPageModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaultPage } from './vault.page';

const routes: Routes = [
  {
    path: '',
    component: VaultPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaultPageRoutingModule {}

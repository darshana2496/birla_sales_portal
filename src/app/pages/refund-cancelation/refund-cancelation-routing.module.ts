import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RefundCancelationPage } from './refund-cancelation.page';

const routes: Routes = [
  {
    path: '',
    component: RefundCancelationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RefundCancelationPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsUsePage } from './terms-use.page';

const routes: Routes = [
  {
    path: '',
    component: TermsUsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsUsePageRoutingModule {}

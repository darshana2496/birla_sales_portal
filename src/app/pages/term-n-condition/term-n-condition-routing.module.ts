import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermNConditionPage } from './term-n-condition.page';

const routes: Routes = [
  {
    path: '',
    component: TermNConditionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermNConditionPageRoutingModule {}

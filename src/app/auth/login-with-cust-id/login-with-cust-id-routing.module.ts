import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginWithCustIdPage } from './login-with-cust-id.page';

const routes: Routes = [
  {
    path: '',
    component: LoginWithCustIdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginWithCustIdPageRoutingModule {}

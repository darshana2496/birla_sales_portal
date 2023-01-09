import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutBirlaPage } from './about-birla.page';

const routes: Routes = [
  {
    path: '',
    component: AboutBirlaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutBirlaPageRoutingModule {}

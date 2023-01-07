import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppIntroPage } from './app-intro.page';

const routes: Routes = [
  {
    path: '',
    component: AppIntroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppIntroPageRoutingModule {}

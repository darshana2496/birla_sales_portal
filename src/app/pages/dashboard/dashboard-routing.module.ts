import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoard } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashBoard,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule {}

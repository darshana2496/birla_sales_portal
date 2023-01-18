import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashBoardPageModule
          ),
      },
      {
        path: 'vault',
        loadChildren: () =>
          import('../vault/vault.module').then((m) => m.VaultPageModule),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('../notification/notification.module').then(
            (m) => m.NotificationPageModule
          ),
      },
      {
        path: 'payments',
        loadChildren: () =>
          import('../payments/payments.module').then(
            (m) => m.PaymentsPageModule
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

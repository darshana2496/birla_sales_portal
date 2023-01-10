import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'AppIntroPage',
        loadChildren: () => import('./app-intro/app-intro.module').then(m => m.AppIntroPageModule)
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path:'loginwithcustid',
        loadChildren:()=>import('./login-with-cust-id/login-with-cust-id.module').then(m=>m.LoginWithCustIdPageModule)
      },
      {
        path: '',
        redirectTo: 'AppIntroPage',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

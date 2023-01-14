import { NgModule } from '@angular/core';
import { ExtraOptions, NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AssetsPreviewComponent } from './common-components/assets-preview/assets-preview.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },{path:'asset-preview',component:AssetsPreviewComponent}
];

const config: ExtraOptions = {
  useHash: false,
};
@NgModule({
  imports: [
    RouterModule.forRoot(routes, config)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./component/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'sujet-modal',
    loadChildren: () => import('./modal/sujet-modal/sujet-modal.module').then( m => m.SujetModalPageModule)
  },
  {
    path: 'sujet-detail',
    loadChildren: () => import('./component/sujet-detail/sujet-detail.module').then( m => m.SujetDetailPageModule)
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./modal/cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
  {
    path: 'popover',
    loadChildren: () => import('./modal/popover/popover.module').then( m => m.PopoverPageModule)
  },
  {
    path: 'paiement',
    loadChildren: () => import('./paiement/paiement.module').then( m => m.PaiementPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

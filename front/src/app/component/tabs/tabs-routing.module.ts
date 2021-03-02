import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'sujet',
        loadChildren: () => import('../sujet/sujet.module').then(m => m.SujetPageModule)
      },
      {
        path: 'disponibilite',
        loadChildren: () => import('../disponibilite/disponibilite.module').then(m => m.DisponibilitePageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'seance',
        loadChildren: () => import('../seance/seance.module').then(m => m.SeancePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/sujet',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/sujet',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

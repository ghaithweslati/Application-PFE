import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'domaine',
        loadChildren: () => import('../domaine/domaine.module').then(m => m.DomainePageModule)
      },
      {
        path: 'sujet',
        loadChildren: () => import('../sujet/sujet.module').then(m => m.SujetPageModule)
      },
      {
        path: 'disponibilite',
        loadChildren: () => import('../disponibilite/disponibilite.module').then(m => m.DisponibilitePageModule)
      },
      {
        path: 'utilisateur',
        loadChildren: () => import('../utilisateur/utilisateur.module').then(m => m.UtilisateurPageModule)
      },
      {
        path: 'seance',
        loadChildren: () => import('../seance/seance.module').then(m => m.SeancePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/seance',
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

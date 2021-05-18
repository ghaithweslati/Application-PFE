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
    loadChildren: () => import('./component/paiement/paiement.module').then( m => m.PaiementPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./component/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'room',
    loadChildren: () => import('./component/room/room.module').then( m => m.RoomPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./component/inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'domaine',
    loadChildren: () => import('./component/domaine/domaine.module').then( m => m.DomainePageModule)
  },
  {
    path: 'conference',
    loadChildren: () => import('./component/conference/conference.module').then( m => m.ConferencePageModule)
  },
  {
    path: 'seance-detail',
    loadChildren: () => import('./component/seance-detail/seance-detail.module').then( m => m.SeanceDetailPageModule)
  },
  {
    path: 'seance-modal',
    loadChildren: () => import('./modal/seance-modal/seance-modal.module').then( m => m.SeanceModalPageModule)
  },
  {
    path: 'parametre-modal',
    loadChildren: () => import('./modal/parametre-modal/parametre-modal.module').then( m => m.ParametreModalPageModule)
  },
  {
    path: 'compte',
    loadChildren: () => import('./component/compte/compte.module').then( m => m.ComptePageModule)
  },
  {
    path: 'expert',
    loadChildren: () => import('./component/expert/expert.module').then( m => m.ExpertPageModule)
  },
  {
    path: 'mdp',
    loadChildren: () => import('./component/mdp/mdp.module').then( m => m.MdpPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

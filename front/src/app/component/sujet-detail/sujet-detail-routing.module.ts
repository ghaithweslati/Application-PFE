import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SujetDetailPage } from './sujet-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SujetDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SujetDetailPageRoutingModule {}

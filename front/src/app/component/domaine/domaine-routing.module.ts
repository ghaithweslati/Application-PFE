import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomainePage } from './domaine.page';

const routes: Routes = [
  {
    path: '',
    component: DomainePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomainePageRoutingModule {}

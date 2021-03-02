import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SujetModalPage } from './sujet-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SujetModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SujetModalPageRoutingModule {}

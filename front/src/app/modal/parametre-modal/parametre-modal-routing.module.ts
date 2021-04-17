import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParametreModalPage } from './parametre-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ParametreModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametreModalPageRoutingModule {}

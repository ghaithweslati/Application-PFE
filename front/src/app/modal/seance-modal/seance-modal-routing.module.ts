import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeanceModalPage } from './seance-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SeanceModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeanceModalPageRoutingModule {}

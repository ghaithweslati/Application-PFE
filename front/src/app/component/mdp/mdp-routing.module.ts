import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MdpPage } from './mdp.page';

const routes: Routes = [
  {
    path: '',
    component: MdpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MdpPageRoutingModule {}

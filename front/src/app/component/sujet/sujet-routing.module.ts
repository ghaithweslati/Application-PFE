import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SujetPage } from './sujet.page';

const routes: Routes = [
  {
    path: '',
    component: SujetPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SujetPageRoutingModule {}

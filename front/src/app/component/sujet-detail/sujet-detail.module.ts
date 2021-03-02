import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SujetDetailPageRoutingModule } from './sujet-detail-routing.module';

import { SujetDetailPage } from './sujet-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SujetDetailPageRoutingModule
  ],
  declarations: [SujetDetailPage]
})
export class SujetDetailPageModule {}

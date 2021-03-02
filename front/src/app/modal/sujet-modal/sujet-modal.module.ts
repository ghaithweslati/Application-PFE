import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SujetModalPageRoutingModule } from './sujet-modal-routing.module';

import { SujetModalPage } from './sujet-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SujetModalPageRoutingModule
  ],
  declarations: [SujetModalPage]
})
export class SujetModalPageModule {}

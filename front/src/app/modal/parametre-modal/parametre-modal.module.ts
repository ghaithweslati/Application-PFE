import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParametreModalPageRoutingModule } from './parametre-modal-routing.module';

import { ParametreModalPage } from './parametre-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParametreModalPageRoutingModule
  ],
  declarations: [ParametreModalPage]
})
export class ParametreModalPageModule {}

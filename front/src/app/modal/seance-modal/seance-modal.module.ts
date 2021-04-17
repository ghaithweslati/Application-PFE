import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeanceModalPageRoutingModule } from './seance-modal-routing.module';

import { SeanceModalPage } from './seance-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeanceModalPageRoutingModule
  ],
  declarations: [SeanceModalPage]
})
export class SeanceModalPageModule {}

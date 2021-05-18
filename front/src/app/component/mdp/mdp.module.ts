import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MdpPageRoutingModule } from './mdp-routing.module';

import { MdpPage } from './mdp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MdpPageRoutingModule
  ],
  declarations: [MdpPage]
})
export class MdpPageModule {}

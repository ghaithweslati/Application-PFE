import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SujetPage } from './sujet.page';


import { SujetPageRoutingModule } from './sujet-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SujetPageRoutingModule
  ],
  declarations: [SujetPage]
})
export class SujetPageModule {}

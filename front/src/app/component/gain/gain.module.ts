import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GainPage } from './gain.page';

import { GainPageRoutingModule } from './gain-routing.module';

import { NgModule, LOCALE_ID } from '@angular/core';

import { NgCalendarModule  } from 'ionic2-calendar';

 

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GainPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [GainPage],
    providers: [
    { provide: LOCALE_ID, useValue: 'Fr-fr' }
  ]
})
export class GainPageModule {}

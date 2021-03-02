import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeancePage } from './seance.page';

import { SeancePageRoutingModule } from './seance-routing.module';

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
    SeancePageRoutingModule,
    NgCalendarModule
  ],
  declarations: [SeancePage],
    providers: [
    { provide: LOCALE_ID, useValue: 'Fr-fr' }
  ]
})
export class SeancePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConferencePageRoutingModule } from './conference-routing.module';

import { ConferencePage } from './conference.page';
import { NgxStripeModule } from 'ngx-stripe';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';


// Import the library

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConferencePageRoutingModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_51IrTqpFWhCHPk1u22I7UXdisRjozAsFfkMuiTHIN8as5Od1krk2rGCvCmpW94MVHbhETUzp6MzoXXgnnl97qXEel003n4dhCgX'),
    
  ],
  declarations: [ConferencePage]
})
export class ConferencePageModule {}

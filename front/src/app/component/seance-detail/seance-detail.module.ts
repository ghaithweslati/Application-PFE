import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeanceDetailPageRoutingModule } from './seance-detail-routing.module';

import { SeanceDetailPage } from './seance-detail.page';
import { NgxStripeModule } from 'ngx-stripe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeanceDetailPageRoutingModule,
    NgxStripeModule.forRoot('pk_test_51IrTqpFWhCHPk1u22I7UXdisRjozAsFfkMuiTHIN8as5Od1krk2rGCvCmpW94MVHbhETUzp6MzoXXgnnl97qXEel003n4dhCgX'),

  ],
  declarations: [SeanceDetailPage]
})
export class SeanceDetailPageModule {}

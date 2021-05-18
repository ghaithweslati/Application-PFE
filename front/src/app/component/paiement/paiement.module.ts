import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaiementPageRoutingModule } from './paiement-routing.module';

import { PaiementPage } from './paiement.page';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaiementPageRoutingModule,
    NgxStripeModule.forRoot('pk_test_51IrTqpFWhCHPk1u22I7UXdisRjozAsFfkMuiTHIN8as5Od1krk2rGCvCmpW94MVHbhETUzp6MzoXXgnnl97qXEel003n4dhCgX'),
  ],
  declarations: [PaiementPage]
})
export class PaiementPageModule {}

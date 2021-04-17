import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilisateurPage } from './utilisateur.page';

import { Tab3PageRoutingModule } from './utilisateur-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
        RouterModule.forChild([{ path: '', component: UtilisateurPage }]),
    Tab3PageRoutingModule,
  ],
  declarations: [UtilisateurPage]
})
export class UtilisateurPageModule {}

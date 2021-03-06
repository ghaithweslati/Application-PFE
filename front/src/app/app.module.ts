import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';





@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [FormsModule,CommonModule,BrowserModule,HttpClientModule,BrowserModule,
    IonicModule.forRoot(),    IonicStorageModule.forRoot(),AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },AndroidPermissions,InAppBrowser],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {


  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hideurlbar:'yes',//Or 'no'

};

vidUrl:SafeResourceUrl;
  constructor(private platform: Platform, private androidPermissions: AndroidPermissions,private domSantizer:DomSanitizer,private iab: InAppBrowser,private route:ActivatedRoute) {

  
  }

  ngOnInit() {
        
    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
          result => console.log('Has permission?', result.hasPermission),
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
        );

        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA,this.androidPermissions.PERMISSION.RECORD_AUDIO]);
      });
    }

    this.route.queryParams.subscribe(params => {
      if (params) {
     //this.vidUrl="https://ghaith-weslati.herokuapp.com/"+params.id
      this.vidUrl=this.domSantizer.bypassSecurityTrustResourceUrl("https://ghaith-weslati.herokuapp.com/"+params.id)

      }
    });


   /*  this.route.queryParams.subscribe(params => {
      if (params) {
        this.iab.create('https://innovup.herokuapp.com/'+params.id,'_blank',this.options).show();
      }
    });*/


  }

}

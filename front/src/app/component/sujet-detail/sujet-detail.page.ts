import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Sujet } from 'src/app/model/sujet';
import { StorageService } from 'src/app/service/storage.service';
import { SujetService } from 'src/app/service/sujet.service';
import { NgZone } from '@angular/core';



@Component({
  selector: 'app-sujet-detail',
  templateUrl: './sujet-detail.page.html',
  styleUrls: ['./sujet-detail.page.scss'],
})
export class SujetDetailPage implements OnInit {

  sujet:Sujet=new Sujet();
  role="";
  constructor(
    private route: ActivatedRoute,
    private sujetService:SujetService,
    private alertCtrl:AlertController,
    private storageService:StorageService,
    private ngZone: NgZone,
    private router:Router) { }

  ngOnInit() {
    this.role=this.storageService.afficherUtilisateurCourant().role;
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.sujet.id=params.id;
        this.sujetService.afficherSujet(this.sujet.id).subscribe(res=>
          {
            this.sujet=res.data;
          })
      }
    });
  }



  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation de supression',
      message: 'Voulez vous vraiment supprimer ce sujet',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Confirmer',
          handler: () => {
            this.sujetService.supprimerSujet(this.sujet.id).subscribe(res=>
              {
                this.ngZone.run(() =>
                this.router.navigate(['./tabs/sujet']));
              })
          }
        }
      ]
    });

    await alert.present();
  }

  plannifierSeance()
  {

      let navigationExtras: NavigationExtras = {
        queryParams: {
          id: this.sujet.id,
          expertId:this.sujet.expert.id
        }
      };
      this.router.navigate(['../tabs/disponibilite'],navigationExtras);
      
  }
  
}

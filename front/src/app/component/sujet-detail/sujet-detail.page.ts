import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Sujet } from 'src/app/model/sujet';
import { StorageService } from 'src/app/service/storage.service';
import { SujetService } from 'src/app/service/sujet.service';
import { NgZone } from '@angular/core';
import{SujetModalPage} from 'src/app/modal/sujet-modal/sujet-modal.page'
import { DomSanitizer } from '@angular/platform-browser';
import {Location} from '@angular/common';
import { EtatUtilisateur } from 'src/app/Enum/EtatUtilisateur';



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
    private modalController:ModalController,
    private toastController:ToastController,
    private _sanitizer: DomSanitizer,
    private location:Location,
    private router:Router) { }

  ngOnInit() {
    this.role=this.storageService.afficherUtilisateurCourant().role;
    this.afficherSujet();
  }



  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation de suppression',
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
                this.presentToast("Suppression du sujet réussi")
                this.ngZone.run(() =>
                this.router.navigate(['./tabs/sujet']));
              })
          }
        }
      ]
    });

    await alert.present();
  }

  reserverConsultation()
  {

    if(this.sujet.expert.etat!=EtatUtilisateur.Banni)
    {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          id: this.sujet.id,
          expertId:this.sujet.expert.id
        }
      };
      this.router.navigate(['../tabs/disponibilite'],navigationExtras);
    }
    else
    {
        this.presentToast("Réservation du consultation échoué!\nL'expert de ce sujet est banni")
    }
  }

  initSujet()
  {
    this.openSujetModal();
  }
  

  async openSujetModal() {
    const modal = await this.modalController.create({
      component: SujetModalPage,
      cssClass: 'sujet-modal',
      backdropDismiss: false,
      componentProps: { 
        sujetModifie:JSON.stringify(this.sujet),
      }
    });
   
    await modal.present();
  
    
    modal.onDidDismiss().then((result) => {
      this.afficherSujet()
    });
  }   


  afficherSujet()
  {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.sujet.id=params.id;
        this.sujetService.afficherSujet(this.sujet.id).subscribe(res=>
          {
            this.sujet=res.data;
            this.sujet.frais.sort((a,b) => a.duree < b.duree ? 1 : -1);
          })
      }
    });
  }

  base64image(photo)
  {
    if(photo)
      return this._sanitizer.bypassSecurityTrustResourceUrl(photo);
    else
      return "assets/icon/user.png"; 
  }


  backPage()
  {
this.location.back();
  }


  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color:'dark'
    });
    toast.present();
  }

}

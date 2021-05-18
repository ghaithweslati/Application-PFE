import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { EtatUtilisateur } from 'src/app/Enum/EtatUtilisateur';
import { ParametreModalPage } from 'src/app/modal/parametre-modal/parametre-modal.page';
import { Utilisateur } from 'src/app/model/utilisateur';
import { AdministrateurService } from 'src/app/service/administrateur.service';
import { DemandeurService } from 'src/app/service/demandeur.service';
import { ExpertService } from 'src/app/service/expert.service';



@Component({
  selector: 'app-utilisateur',
  templateUrl: 'utilisateur.page.html',
  styleUrls: ['utilisateur.page.scss']
})
export class UtilisateurPage implements OnInit {

  role="demandeur";
  utilisateurs:Utilisateur[]=[];
  constructor(private expertService:ExpertService,
    private demandeurService:DemandeurService,
    private administrateurService:AdministrateurService,
    private alertController:AlertController,
    private popCtrl:PopoverController,
    private toastController:ToastController,
    private router:Router,
    private _sanitizer: DomSanitizer) {}



    ngOnInit() {
      this.afficherLesDemandeurs();
    }

    

  afficherLesExperts()
  {
        this.expertService.afficherExperts().subscribe(res=>
          {
            this.utilisateurs=res.data.rows;
          });
  }

  afficherLesDemandeurs()
  {
        this.demandeurService.afficherDemandeurs().subscribe(res=>
          {
            this.utilisateurs=res.data.rows;
          });
  }


  afficherLesAdministrateurs()
  {
        this.administrateurService.afficherAdministrateurs().subscribe(res=>
          {
            this.utilisateurs=res.data.rows;
          });
  }

  modifierExpert(utilisateur,id)
  {
    this.expertService.modifierExpert(utilisateur,id).subscribe(res=>
      {
        if(utilisateur.etat==EtatUtilisateur.Banni)
        this.presentToast(utilisateur.prenom+" "+utilisateur.nom+" est banni !")
      else
        this.presentToast(utilisateur.prenom+" "+utilisateur.nom+" n'est plus banni !")
          this.afficherLesExperts();
      });
  }


  modifierDemandeur(utilisateur,id)
  {
    this.demandeurService.modifierDemandeur(utilisateur,id).subscribe(res=>
      {
        if(utilisateur.etat==EtatUtilisateur.Banni)
        this.presentToast(utilisateur.prenom+" "+utilisateur.nom+" est banni !")
      else
        this.presentToast(utilisateur.prenom+" "+utilisateur.nom+" n'est plus banni !")
          this.afficherLesDemandeurs();
      });
  }


  modifierAdministrateur(utilisateur,id)
  {
    this.administrateurService.modifierAdministrateur(utilisateur,id).subscribe(res=>
      {
          this.afficherLesAdministrateurs();
      });
  }


  base64image(photo)
  {
    if(photo)
      return this._sanitizer.bypassSecurityTrustResourceUrl(photo);
    else
      return "assets/icon/user.png";
  }

  segmentChanged(event)
  {
    this.role=event.target.value;
    if(this.role=="expert")
      this.afficherLesExperts();
    else if(this.role=="demandeur")
      this.afficherLesDemandeurs();
    else
      this.afficherLesAdministrateurs();
  }


  bannir(utilisateur:Utilisateur)
  {
    utilisateur.etat=EtatUtilisateur.Banni;
    if(this.role=="expert")
      this.modifierExpert(utilisateur,utilisateur.id);
    else if(this.role=="administrateur")
      this.modifierAdministrateur(utilisateur,utilisateur.id);
    else
      this.modifierDemandeur(utilisateur,utilisateur.id);
  }


  activer(utilisateur:Utilisateur)
  {
    utilisateur.etat=EtatUtilisateur.Actif;
    if(this.role=="expert")
      this.modifierExpert(utilisateur,utilisateur.id);
    else if(this.role=="administrateur")
      this.modifierAdministrateur(utilisateur,utilisateur.id);
    else
      this.modifierDemandeur(utilisateur,utilisateur.id);
  }


  

  async presentAlertConfirmBannir(utilisateur:Utilisateur) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Bannir l\'utilisateur',
      message: 'Voulez vous vraiment bannir <strong>'+utilisateur.prenom+' '+utilisateur.nom+' </strong>!!!',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmer',
          handler: () => {
            this.bannir(utilisateur);
          }
        }
      ]
    });
    await alert.present();
  }




  async presentAlertConfirmActiver(utilisateur:Utilisateur) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Annuler le ban pour l\'utilisateur',
      message: 'Voulez vous vraiment annuler le ban pour <strong>'+utilisateur.prenom+' '+utilisateur.nom+' </strong>!!!',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmer',
          handler: () => {
            this.activer(utilisateur);
          }
        }
      ]
    });
    await alert.present();
  }



  async initParametres(ev)
  {
      const popover = await this.popCtrl.create(
        {
          component:ParametreModalPage,
          event:ev,
  
        }
      )

      return await popover.present();
  }


  
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color:'dark'
    });
    toast.present();
  }
 

  
  afficherDetail(id:number)
  {
    if(this.role=="expert")
    {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id
      }
    };
    this.router.navigate(['../expert/'],navigationExtras);
  }
}


}

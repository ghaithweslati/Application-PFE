import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/model/utilisateur';
import { AdministrateurService } from 'src/app/service/administrateur.service';
import { DemandeurService } from 'src/app/service/demandeur.service';
import { ExpertService } from 'src/app/service/expert.service';
import { StorageService } from 'src/app/service/storage.service';
import { Location } from '@angular/common'
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-mdp',
  templateUrl: './mdp.page.html',
  styleUrls: ['./mdp.page.scss'],
})
export class MdpPage implements OnInit {

  role="";
  acutel="";
  nouveau="";
  confirmer="";
  utilisateur:Utilisateur=new Utilisateur();
  constructor(private storageService:StorageService,
    private adminService:AdministrateurService,
    private expertService:ExpertService,
    private demandeurService:DemandeurService,
    private location:Location,
    private toastController:ToastController,
    private loadingController:LoadingController,
    ) { }

  ngOnInit() {
    this.role=this.storageService.afficherUtilisateurCourant().role;
    this.utilisateur=JSON.parse(localStorage.getItem('user'));
  }


 async modifier()
  {
    const loading = await this.loadingController.create({
      message: 'Modification en cours...',
      translucent: true,
      backdropDismiss:true,
    });
    await loading.present();
    if(this.verifier())
    {
      this.utilisateur.password=this.nouveau;
      if(this.role=="Administrateur")
      {
        this.adminService.modifierAdministrateur(this.utilisateur,this.utilisateur.id).subscribe(res=>
          {
            loading.dismiss();
            this.presentToast("Changement du mot de passe réussi");
            this.location.back();
          })
      }
      else if(this.role=="Demandeur")
      {
        this.demandeurService.modifierDemandeur(this.utilisateur,this.utilisateur.id).subscribe(res=>
          {
            loading.dismiss();
            this.presentToast("Changement du mot de passe réussi")
            this.location.back();
          })
      }
      else
      {
        this.expertService.modifierExpert(this.utilisateur,this.utilisateur.id).subscribe(res=>
          {
            loading.dismiss();
            this.presentToast("Changement du mot de passe réussi")
            this.location.back();
            
          })
      }
    }
    else
    {
      loading.dismiss();
    }
  }

  verifier()
  {
     const utilisateurConnecte=JSON.parse(localStorage.getItem('user'));
  /*  if(this.acutel!=utilisateurConnecte.salt)
    {
        this.presentToast("Mot de passe actuel incorrecte")
        return false;
    }*/
    if(this.nouveau!=this.confirmer)
    {
        this.presentToast("Les deux nouveaux mots de passe ne sont pas identiques")
        return false;
    }
    if(this.nouveau.length<6)
    {
        this.presentToast("La taille du mot de passe doit être supérieur à 6")
        return false;
    }
    return true;
  }


  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color:'dark'
    });
    toast.present();
  }
 
}

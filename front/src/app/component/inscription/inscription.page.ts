import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, Subscriber } from 'rxjs';
import { EtatUtilisateur } from 'src/app/Enum/EtatUtilisateur';
import { Domaine } from 'src/app/model/domaine';
import { Expert } from 'src/app/model/expert';
import { Utilisateur } from 'src/app/model/utilisateur';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { DomaineService } from 'src/app/service/domaine.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  utilisateur:Utilisateur = new Utilisateur();
  expert:Expert=new Expert();
  domaines:Domaine[]=[];
  role:String="Demandeur";
  myimage: Observable<any>;
  path="../../../assets/icon/uploader.jpg";
  constructor(private authService: AuthentificationService,
    private domaineService:DomaineService,
    private storageService:StorageService,
    private toastController:ToastController,
    private loadingController:LoadingController,
    private router: Router) {}

  public ngOnInit(): void {
     this.domaineService.afficherDomaines().subscribe((res:any)=>
    {
      this.domaines=res.data.rows;
    })
  }

  
  async inscrire() {

    this.expert.etat=EtatUtilisateur.Actif;
    var user=Object.assign(this.expert,{'role':this.role},{'domaineId':this.expert.domaine.id},{'compteId':this.expert.compte.code});

    if(this.verif(user))
    {
      const loading = await this.loadingController.create({
        message: 'Inscription en cours...',
        translucent: true,
        backdropDismiss:true,
      });
      await loading.present();

    this.authService.inscrire(user).subscribe((res:any) => {
      loading.dismiss();
      this.presentToast("Inscription réussi")
      const nouveauUtilisateur=res.user;
      nouveauUtilisateur.role=this.role;      
      localStorage.setItem('token',res.token);
      this.storageService.setUtilisateurCourant(nouveauUtilisateur);
      this.router.navigate(['./tabs'],);
    }, 
    error =>
    {
        loading.dismiss()
        this.presentToast('Email existant')
    });
    }
  }


  changeListener($event: Event)
  {
    const file = ($event.target as HTMLInputElement).files[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    this.myimage = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    this.myimage.subscribe((d)=>{
      this.expert.photo=d;
      this.path=d;
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }


  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color:'dark'
    });
    toast.present();
  }

  verif(utilisateur)
  {
    if(utilisateur.nom==undefined||utilisateur.nom=="")
    {
      this.presentToast("Nom invalide");
      return false;
    }
    if(utilisateur.prenom==undefined||utilisateur.prenom=="")
    {
      this.presentToast("Prenom invalide");
      return false;
    }
    if(utilisateur.email==undefined||this.validateEmail(utilisateur.email)==false)
    {
      this.presentToast("Email invalide");
      return false;
    }
    
    if(utilisateur.password==undefined||utilisateur.password.length<6)
    {
      this.presentToast("La taille du mot de passe doit être supérieur à 6 caractéres");
      return false;
    }
    if(this.role=="Expert")
    {
      if(utilisateur.domaine.id==undefined)
      {
        this.presentToast("Vous devez séléctionné un domaine");
        return false; 
      }
      if(utilisateur.specialite==undefined||utilisateur.specialite=="")
      {
        this.presentToast("Specialité invalide");
        return false; 
      }
      if(utilisateur.compte.code==undefined)
      {
        this.presentToast("Compte invalide");
        return false; 
      }
    }
    return true;
  }

 validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

}

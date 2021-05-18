import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { EtatUtilisateur } from 'src/app/Enum/EtatUtilisateur';
import { Utilisateur } from '../../model/utilisateur';
import { AuthentificationService } from '../../service/authentification.service';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  utilisateur:Utilisateur =new Utilisateur();
  eventSource = [];
  nom='test';
  constructor(private authService: AuthentificationService,
    private storageService:StorageService,
    private router: Router,
    private loadingController:LoadingController,
    public toastController: ToastController) {}

    
    async presentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,
        color:'dark'
      });
      toast.present();
    }
   

  ngOnInit() {
  }

async login()
  {

    const loading = await this.loadingController.create({
      message: 'Chargement...',
      translucent: true,
      backdropDismiss:true,
    });
    await loading.present();

    this.authService.login(this.utilisateur).subscribe((res:any) =>
      {
        loading.dismiss();
        var user =res.user;
        if(user.etat==EtatUtilisateur.Banni)
          this.presentToast("Votre compte est banni");
        else
        {
          user.role=res.type;
          var direction="/";
          if (user.role=="Administrateur") {
            direction+="/domaine"
          }
          localStorage.setItem('token',res.token);
          this.storageService.setUtilisateurCourant(res.user);
          this.router.navigate(['./tabs'+direction],);
          this.presentToast("Authentification réussi");
        }
      },
      error=>
      {
        this.presentToast(error.error.msg);
        loading.dismiss();
      }
      )

  }


  goPageInscription()
  {

    this.router.navigate(['../inscription/']);
  }



}

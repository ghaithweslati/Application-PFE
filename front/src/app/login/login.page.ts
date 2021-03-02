import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Utilisateur } from '../model/utilisateur';
import { AuthentificationService } from '../service/authentification.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  utilisateur:Utilisateur =new Utilisateur();
  eventSource = [];

  constructor(private authService: AuthentificationService,private storageService:StorageService,
    private router: Router,public toastController: ToastController) {}

    
    async presentToast(message) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,
      });
      toast.present();
    }
   

  ngOnInit() {
  
  }

  login()
  {
    this.authService.login(this.utilisateur).subscribe((res:any) =>
      {
        //localStorage.setItem('token',res.token+"");
      //  this.storage.set('token', res.token+"");
        //this.presentToast("Authentification réussit");*/
        this.router.navigate(['../'],);
        var user =res.user;
        if ('specialite' in user) {
          user.role="Expert"
        }
        else
        {
          user.role="Demandeur"
        }
        localStorage.setItem('token',res.token);
        this.storageService.setUtilisateurCourant(res.user);
      },
      error=>
      {
        this.presentToast(error.error.msg);
      }
      )

  }

}

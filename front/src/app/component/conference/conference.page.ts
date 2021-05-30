import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StatusSeance } from 'src/app/Enum/StatusSeance';
import { TypeConference } from 'src/app/Enum/TypeConference';
import { Conference } from 'src/app/model/conference';
import { Sujet } from 'src/app/model/sujet';
import { Notification } from 'src/app/model/notification';
import { ConferenceService } from 'src/app/service/conference.service';
import { PeriodeSeanceService } from 'src/app/service/periode_seance.service';
import { StorageService } from 'src/app/service/storage.service';
import { SujetService } from 'src/app/service/sujet.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaiementService } from 'src/app/service/paiement.service';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { ThrowStmt } from '@angular/compiler';
import { AdministrateurService } from 'src/app/service/administrateur.service';
import { NotificationService } from 'src/app/service/notification.service';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-conference',
  templateUrl: './conference.page.html',
  styleUrls: ['./conference.page.scss'],
})
export class ConferencePage implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  duree=1;
  heureDeb:string ;
  heureFin:string;
  date:string;
  conference:Conference=new Conference();
  sujets:Sujet[]=[];
  type=TypeConference.Payant;
  datemin:Date;
  notification:Notification=new Notification();
  exp;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '17px',
        '::placeholder': {
          color: '#6E6E6E'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'fr'
  };

  stripeTest: FormGroup;

  
  constructor(private periodeSeanceServ:PeriodeSeanceService,
    private sujetService:SujetService,
    private storageService:StorageService,
    private conferenceService:ConferenceService,
    private route:ActivatedRoute,
    private router:Router,
    private stripeService: StripeService,
    private fb: FormBuilder,
    private paiementService:PaiementService,
    private administrateurService:AdministrateurService,
    private notificationService:NotificationService,
    private toasterController:ToastController,
    private loadingController:LoadingController,
    ) { }

  ngOnInit() {

    this.administrateurService.afficherAdministrateur(1).subscribe((res:any)=>
    {
      this.exp=res.data.compte.cle;
    })

    this.datemin=new Date();
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });

    this.afficherSujets();

    this.date = new Date().toISOString().slice(0, 10);
    this.heureDeb = new Date().toISOString().slice(11,16);
    this.heureFin = new Date().toISOString().slice(11,16);

 
  }

  async ajouterConference()
  {
    const loading = await this.loadingController.create({
      message: 'Ajout du conférence du en cours..',
      translucent: true,
      backdropDismiss:true,

    });
    await loading.present();

    this.conference.periode_seance.dateDeb=this.date.substr(0,10)+" "+this.heureDeb;
    this.conference.periode_seance.dateFin=this.date.substr(0,10)+" "+this.heureFin;
    if(this.type=="Payant")
      this.conference.type=TypeConference.Payant;
    else
      this.conference.type=TypeConference.Gratuit;
    this.conference.status=StatusSeance.NonCommence;
    this.periodeSeanceServ.ajouterPeriodeSeance(this.conference.periode_seance).subscribe((res:any)=>
    {
          var conf=Object.assign(this.conference,{'sujetId':this.conference.sujet.id},{'periodeSeanceId':res.data.id});
          this.conferenceService.ajouterConference(conf).subscribe((res:any)=>
          {
            loading.dismiss();
            this.notification.texte="a planifié une conférence";
            const notif = Object.assign( {}, this.notification, {'conferenceId':res.data.id} );
            this.notificationService.ajouterNotification(notif).subscribe();

            let navigationExtras: NavigationExtras = {
              queryParams: {
                id: res.data.id,
                type:"Conference",
              }
            };
            this.router.navigate(['../seance-detail'],navigationExtras);
          });  

    })

  }

  afficherSujets()
  {
    const id = this.storageService.afficherUtilisateurCourant().id;
    const role = this.storageService.afficherUtilisateurCourant().role;
    this.sujetService.afficherTousSujets(role,id).subscribe(res=>
      {
        this.sujets=res.data.rows;
      });
  }



async payer() {
  if(this.verif())
  {
    const loading = await this.loadingController.create({
      message: 'Paiement en cours..',
      translucent: true,
      backdropDismiss:true,

    });
    await loading.present();

  const utilisateurConnecte=JSON.parse(localStorage.getItem('user'));
  const name =utilisateurConnecte.prenom+" "+utilisateurConnecte.nom;
  this.stripeService
    .createToken(this.card.element, { name })
    .subscribe((result) => {
      loading.dismiss();
      if (result.token) {
          const transaction={ 
            token : result.token.id,
            solde:this.duree/2,
            exp:this.exp
          }
          this.paiementService.payer(transaction).subscribe(res=>
            {
                this.ajouterConference()
            })
          
        console.log(result.token.id);
      } else if (result.error) {
        loading.dismiss();
        this.presentToast("Données du compte saisies invalides")

      }
    });
  }
}




calculePeriode()
{

  var t1 = new Date();
  var t2 = new Date(this.date);
  t1.setHours(0, 0, 0, 0);
  var dif = Math.abs(t1.getTime() - t2.getTime());
  var jour = dif /(1000 * 3600 * 24);
  if(jour!=0)
    this.duree=jour;
  else
  this.duree=1

}

verif()
{
  if(this.conference.sujet.id==undefined)
  {
    this.presentToast("Vous devez choisir un sujet");
    return false;
  }
  if(this.date < new Date().toISOString().slice(0, 10))
  {
    this.presentToast("La date de conférence doit être supérieure à la date d'aujourd'hui");
    return false;
  }
  if(this.heureDeb < new Date().toISOString().slice(11, 15))
  {
    this.presentToast("L'heure de conférence doit être supérieure à la date actuelle");
    return false;
  }
  if(this.heureDeb >= this.heureFin)
  {
    this.presentToast("L'heure de fin doit être supérieure à l'heure de début");
    return false;
  }
  return true
}


async presentToast(message) {
  const toast = await this.toasterController.create({
    message: message,
    duration: 2000,
    color:'dark'
  });
  toast.present();
}


}

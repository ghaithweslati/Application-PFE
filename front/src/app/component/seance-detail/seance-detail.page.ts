import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IonThumbnail, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { StatusSeance } from 'src/app/Enum/StatusSeance';
import { Conference } from 'src/app/model/conference';
import { Consultation } from 'src/app/model/consultation';
import { Seance } from 'src/app/model/seance';
import { Utilisateur } from 'src/app/model/utilisateur';
import { ConferenceService } from 'src/app/service/conference.service';
import { ConsultationService } from 'src/app/service/consultation.service';
import { ParticipationService } from 'src/app/service/participation.service';
import { StorageService } from 'src/app/service/storage.service';
import { SeanceModalPage } from 'src/app/modal/seance-modal/seance-modal.page';
import { TypeConference } from 'src/app/Enum/TypeConference';
import { Notification } from 'src/app/model/notification';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { PaiementService } from 'src/app/service/paiement.service';
import { Demandeur } from 'src/app/model/demandeur';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-seance-detail',
  templateUrl: './seance-detail.page.html',
  styleUrls: ['./seance-detail.page.scss'],
})
export class SeanceDetailPage implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;


  consultation:Consultation=new Consultation();
  conference:Conference=new Conference();
  seance:Seance=new Seance();
  type="";
  utilisateurConnecte;
  action="Participer";
  notification:Notification=new Notification();
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
  constructor(private consultationService:ConsultationService,
    private conferenceService:ConferenceService,
    private participationService:ParticipationService,
    private route: ActivatedRoute,
    private router:Router,
    private modalCtrl:ModalController,
    private storageService:StorageService,
    private toastController:ToastController,
    private stripeService: StripeService,
    private paiementService:PaiementService,
    private loadingController:LoadingController,
    private notificationService:NotificationService,
    private _sanitizer: DomSanitizer,
    ) { }

    
  ngOnInit() {    

    this.utilisateurConnecte=this.storageService.afficherUtilisateurCourant();
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.seance.id=params.id;
        this.type=params.type;


  
        if(this.type=="Consultation")
          this.afficherConsultation();
        else
          this.afficherConference();

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

  afficherConsultation()
  {
    this.consultationService.afficherConsultation(this.seance.id).subscribe(res=>
      {
        this.consultation=res.data;
        this.seance=res.data;

        

        if(localStorage.getItem("status"))
        {
          localStorage.removeItem("status");
          if(this.utilisateurConnecte.role=="Expert")
          {
            this.seance.status=StatusSeance.Cloture;
              this.consultation.status=StatusSeance.Cloture;
              this.consultationService.modifierConsultation(this.consultation,this.seance.id).subscribe();
            
          }
          else
          {
              if(this.consultation.note==undefined )
                this.openSeanceModal();
          }
  
        }
      })
  }

  afficherConference()
  {
    this.conferenceService.afficherConference(this.seance.id).subscribe(res=>
      {
        this.conference=res.data;
        this.seance=res.data;
      })

      

      if(localStorage.getItem("status"))
      {
        if(this.utilisateurConnecte.role=="Expert")
        {
          this.seance.status=StatusSeance.Cloture;

            this.conference.status=StatusSeance.Cloture;
            this.conferenceService.modifierConference(this.conference,this.seance.id).subscribe();
          
        }
        localStorage.removeItem("status");
        
      }
  }


  goRoom()
  {
   if(this.type=="Consultation")
    {
      this.consultation.status=StatusSeance.EnCours;
      this.consultationService.modifierConsultation(this.consultation,this.seance.id).subscribe();
   

    }
    else
      {
        this.conference.status=StatusSeance.EnCours;
        this.conferenceService.modifierConference(this.conference,this.seance.id).subscribe();
      /*  const notif = Object.assign( {}, this.notification, {'conferenceId':this.conference.id} );
        this.notificationService.ajouterNotification(notif).subscribe();*/

 
      }
    var t1 = new Date(this.seance.periode_seance.dateFin);
    var t2 = new Date(this.seance.periode_seance.dateDeb);
    var dif = t1.getTime() - t2.getTime();
    var duree = dif / 1000  ;



    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.type+this.seance.id,
        sujet:this.seance.sujet.titre,
        duree:duree,
        role:this.storageService.afficherUtilisateurCourant().role,
        nom:this.storageService.afficherUtilisateurCourant().prenom+" "+this.storageService.afficherUtilisateurCourant().nom
      }
    };
    this.router.navigate(['../room/'],navigationExtras);
  }


  verifierParticipation()
  {
  var participe=false;
  var i=0;
  if(this.conference.id!=null)
  {
    if(this.utilisateurConnecte.role=="Expert")
    {
      participe=true;     
    }
    else
    {
    while(i<this.conference.demandeurs.length&&this.conference.demandeurs[i].id!=this.utilisateurConnecte.id)
      i++;
    if(i<this.conference.demandeurs.length)
      participe=true;
    }
  }
  else
  {
    participe=true;
  }
  return participe;
  }

  fraisSeance(seance:any)
  {

    var t1 = new Date(seance.periode_seance.dateFin);
    var t2 = new Date(seance.periode_seance.dateDeb);
    var dif = t1.getTime() - t2.getTime();
    var minute = dif / 1000 / 60 ;
    var frais = seance.sujet.frais;
    frais.sort((a,b) => a.duree < b.duree ? 1 : -1);
    var prix =0;
    var i = 0;
   

    while(i<frais.length)
    {
      if(minute>=frais[i].duree)
      {
        minute-=frais[i].duree;
        prix+=frais[i].prix;
      }
      else
        i++;
    }
    return prix;

  }


  participer()
  {
    if(this.action=="Participer")
    {
      this.action="Payer";
    }
    else
    {
      this.payer();
    }
  }

  
   
async payer() {
  const loading = await this.loadingController.create({
    message: 'Paiement en cours..',
    translucent: true,
  });
  await loading.present();
  const utilisateurConnecte=JSON.parse(localStorage.getItem('user'));
  const name =utilisateurConnecte.prenom+" "+utilisateurConnecte.nom;
  this.stripeService
    .createToken(this.card.element, { name })
    .subscribe((result) => {
      if (result.token) {
          const transaction={ 
            token : result.token.id,
            solde:this.fraisSeance(this.conference),
            exp:this.conference.sujet.expert.compte.cle
          }
          this.paiementService.payer(transaction).subscribe(res=>
            {
               // this.reserverConsultation();

              this.participationService.ajouterParticipation({"demandeurId":this.utilisateurConnecte.id,"conferenceId":this.conference.id}).subscribe((res:any)=>
              {
                loading.dismiss();
                this.presentToast("Participation réussi");
                this.action="";
                this.notification.texte="a participé à votre conférence";
                const notif = Object.assign( {}, this.notification, {'conferenceId':this.conference.id} );
                this.notificationService.ajouterNotification(notif).subscribe();
    
                this.afficherConference();
                });
            })
          
        console.log(result.token.id);
      } else if (result.error) {
        // Error creating the token
          this.presentToast("Données du compte invalides !")
      }
    });
}


async presentToast(message) {
  const toast = await this.toastController.create({
    message: message,
    duration: 4000,
    color:'dark'
  });
  toast.present();
}


  async openSeanceModal() {
    const modal = await this.modalCtrl.create({
      component: SeanceModalPage,
      cssClass: 'seance-modal',
      backdropDismiss: false
    });
   
    await modal.present();
  
    
    modal.onDidDismiss().then((result:any) => {
      if(result.data)
      {
        this.consultation.note=result.data.note;
        this.consultationService.modifierConsultation(this.consultation,this.seance.id).subscribe();
        localStorage.removeItem('status');
      }
    });
  }   


  back()
  {
    this.router.navigate(['../tabs/seance']);
  }
}

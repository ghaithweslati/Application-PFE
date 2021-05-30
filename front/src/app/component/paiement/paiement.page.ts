import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { LoadingController, ToastController } from "@ionic/angular";
import { StatusSeance } from "src/app/Enum/StatusSeance";
import { Consultation } from "src/app/model/consultation";
import { Notification } from "src/app/model/notification";
import { Sujet } from "src/app/model/sujet";
import { CompteService } from "src/app/service/compte.service";
import { ConsultationService } from "src/app/service/consultation.service";
import { PeriodeSeanceService } from "src/app/service/periode_seance.service";
import { SujetService } from "src/app/service/sujet.service";


import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { PaiementService } from "src/app/service/paiement.service";
import { AdministrateurService } from "src/app/service/administrateur.service";
import { NotificationService } from "src/app/service/notification.service";




@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.page.html',
  styleUrls: ['./paiement.page.scss'],
})
export class PaiementPage implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;


  compte:any={"code":"","mdp":""};
  heureDeb:string;
  heureFin:string;
  heureMin:String;
  heureMax:String;
  date:string;
  prix=0;
  duree=0;
  sujet:Sujet=new Sujet();
  consultation:Consultation=new Consultation();
  hourValues = ['06','07','08','09','10','11','12','13','14','15','16','17','18','19'];
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

  elementsOptions: StripeElementsOptions = {
    locale: 'fr'
  };


  constructor(private periodeSeanceServ:PeriodeSeanceService,
    private consultationService:ConsultationService,
    private route:ActivatedRoute,
    private loadingController:LoadingController,
    private toastController:ToastController,
    private router:Router,
    private stripeService: StripeService,
    private compteService:CompteService,
    private sujetService:SujetService,
    private paiementService:PaiementService,
    private notificationService:NotificationService,
    ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params) {
        this.date=params.date;
        this.heureMax=params.heureMax;
        this.heureMin=params.heureMin;
        this.heureDeb=params.heureMin;
        this.heureFin=params.heureMax;

 
        this.sujet.id=params.id;
        this.sujetService.afficherSujet(this.sujet.id).subscribe(res=>
          {
            this.sujet=res.data;
            this.sommeFrais();
          })
      }
    });
  }

   /*payer()
  {
    this.compteService.getCompte(this.compte).subscribe((res:any)=>
    {
      this.compte=res.compte;
      if(this.compte.solde<this.prix)
      {
          this.presentToast("Votre solde est insuffisant")
      }
      else
      {
        this.ajouterConsultation();
      }
    },
    (error)=>
    {
      this.presentToast(error.error.msg)
    }
    )

    
  }*/

  async ajouterConsultation()
    {
      
    this.consultation.periode_seance.dateDeb=this.date+" "+this.heureDeb;
    this.consultation.periode_seance.dateFin=this.date+" "+this.heureFin;

    if(this.heureDeb>=this.heureFin)
      this.presentToast("Période invalide!\n la date de début doit être avant la date du fin")
    else if(this.heureDeb<this.heureMin||this.heureFin>this.heureMax)
      this.presentToast("Periode invalide!\n la période doit être entre "+this.heureMax+" et "+this.heureMin)
    else
    {
      const loading = await this.loadingController.create({
        message: 'Réservation en cours..',
        translucent: true,
      });
      await loading.present();

      
    this.periodeSeanceServ.ajouterPeriodeSeance(this.consultation.periode_seance).subscribe((res:any)=>
    {
      this.route.queryParams.subscribe(params => {
        if (params) {
          const consultation = {"status":StatusSeance.NonCommence,"sujetId":params.id,"periodeSeanceId":res.data.id} 
          this.consultationService.ajouterConsultation(consultation).subscribe((res:any)=>
          {
            loading.dismiss();
            this.presentToast("Réservation du consultation réussi");
            let navigationExtras: NavigationExtras = {
              queryParams: {
                id: res.data.id,
                type:"Consultation",
              }
            };
            this.router.navigate(['../seance-detail'],navigationExtras);
          });  
        }
      });
    })
  }
    }
/*
    faireTransaction()
    {
      this.compte.solde-=this.prix;
      this.compteService.modifierCompte(this.compte,this.compte.id).subscribe();
      this.sujet.expert.compte.solde+=this.prix;
      this.compteService.modifierCompte(this.sujet.expert.compte,this.sujet.expert.compte.id).subscribe();
    }
*/


    
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
            solde:this.prix,
            exp:this.sujet.expert.compte.cle
          }
          this.paiementService.payer(transaction).subscribe(res=>
            {
                this.reserverConsultation();
                loading.dismiss();
            })
          
        console.log(result.token.id);
      } else if (result.error) {
        // Error creating the token
          this.presentToast("Données du compte invalides !")
      }
    });
}

async reserverConsultation()
{

    this.consultation.periode_seance.dateDeb=this.date+" "+this.heureDeb;
    this.consultation.periode_seance.dateFin=this.date+" "+this.heureFin;

    if(this.heureDeb>=this.heureFin)
      this.presentToast("Période invalide!\n la date de début doit être avant la date du fin")
    else if(this.heureDeb<this.heureMin||this.heureFin>this.heureMax)
      this.presentToast("Periode invalide!\n la période doit être entre "+this.heureMax+" et "+this.heureMin)
    else
    {
      const loading = await this.loadingController.create({
        message: 'Réservation en cours..',
        translucent: true,
      });
      await loading.present();

      
    this.periodeSeanceServ.ajouterPeriodeSeance(this.consultation.periode_seance).subscribe((res:any)=>
    {
      this.route.queryParams.subscribe(params => {
        if (params) {
          const consultation = {"status":StatusSeance.NonCommence,"sujetId":params.id,"periodeSeanceId":res.data.id} 
          this.consultationService.ajouterConsultation(consultation).subscribe((res:any)=>
          {
            this.notification.texte="a réservé une consultation";
            const notif = Object.assign( {}, this.notification, {'consultationId':res.data.id} );
            this.notificationService.ajouterNotification(notif).subscribe();

            loading.dismiss();
            this.presentToast("Réservation du consultation réussi");
            
            let navigationExtras: NavigationExtras = {
              queryParams: {
                id: res.data.id,
                type:"Consultation",
              }
            };
            this.router.navigate(['../seance-detail'],navigationExtras);
          });  
        }
      });
    })
  }
}

  



  sommeFrais()
  {

    var t1 = new Date('2020-02-02 '+this.heureDeb);
    var t2 = new Date('2020-02-02 '+this.heureFin);
    var dif = Math.abs(t1.getTime() - t2.getTime());
    var minute = dif / 1000 / 60 ;
    var frais = this.sujet.frais;
    frais.sort((a,b) => a.duree < b.duree ? 1 : -1);
    var prix =0;
    var i = 0;
   
    
    this.duree=minute;
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

    this.prix=prix;

  }



   

    


  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000,
      color:'dark'
    });
    toast.present();
  }


  backPage()
  {
    this.router.navigate(['../tabs/domaine']);

  }
  

}

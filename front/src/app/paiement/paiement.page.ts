import { Component, OnInit } from '@angular/core';
import { Consultation } from '../model/consultation';
import { ConsultationService } from '../service/consultation.service';
import { PeriodeSeanceService } from '../service/periode_seance.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { StatusSeance } from '../Enum/StatusSeance';
import { LoadingController, ToastController } from '@ionic/angular';
import {Location} from '@angular/common';



@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.page.html',
  styleUrls: ['./paiement.page.scss'],
})
export class PaiementPage implements OnInit {

  heureDeb:string;
  heureFin:string;
  heureMin:String;
  heureMax:String;
  date:string;
  consultation:Consultation=new Consultation();
  hourValues = ['06','07','08','09','10','11','12','13','14','15','16','17','18','19'];
  constructor(private periodeSeanceServ:PeriodeSeanceService,
    private consultationService:ConsultationService,
    private route:ActivatedRoute,
    private loadingController:LoadingController,
    private toastController:ToastController,
    private router:Router,
    private location:Location,
    ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params) {
        this.date=params.date;
        this.heureMax=params.heureMax;
        this.heureMin=params.heureMin;
        this.heureDeb=params.heureMin;
        this.heureFin=params.heureMax;
      }

  })

  }

  async payer()
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

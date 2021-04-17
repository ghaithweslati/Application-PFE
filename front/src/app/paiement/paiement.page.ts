import { Component, OnInit } from '@angular/core';
import { Consultation } from '../model/consultation';
import { ConsultationService } from '../service/consultation.service';
import { PeriodeSeanceService } from '../service/periode_seance.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { StatusSeance } from '../Enum/StatusSeance';


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
    private router:Router
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

  payer()
  {
    this.consultation.periode_seance.dateDeb=this.date+" "+this.heureDeb;
    this.consultation.periode_seance.dateFin=this.date+" "+this.heureFin;

    this.periodeSeanceServ.ajouterPeriodeSeance(this.consultation.periode_seance).subscribe((res:any)=>
    {
      this.route.queryParams.subscribe(params => {
        if (params) {
          const consultation = {"status":StatusSeance.EnAttente,"sujetId":params.id,"periodeSeanceId":res.data.id} 
          this.consultationService.ajouterConsultation(consultation).subscribe((res:any)=>
          {
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

import { Component, OnInit } from '@angular/core';
import { Consultation } from '../model/consultation';
import { ConsultationService } from '../service/consultation.service';
import { PeriodeSeanceService } from '../service/periode_seance.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { statusSeance } from '../Enum/statusSeance';


@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.page.html',
  styleUrls: ['./paiement.page.scss'],
})
export class PaiementPage implements OnInit {

  heureDeb:string;
  heureFin:string;
  date:string;
  consultation:Consultation=new Consultation();
  constructor(private periodeSeanceServ:PeriodeSeanceService,
    private consultationService:ConsultationService,
    private route:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit() {
  }

  payer()
  {
    this.consultation.periode_seance.dateDeb=this.date.substr(0,10)+" "+this.heureDeb.substr(11,5);
    this.consultation.periode_seance.dateFin=this.date.substr(0,10)+" "+this.heureFin.substr(11,5);
    this.periodeSeanceServ.ajouterPeriodeSeance(this.consultation.periode_seance).subscribe((res:any)=>
    {
      this.route.queryParams.subscribe(params => {
        if (params) {
          const consultation = {"status":statusSeance.EnAttente,"dureeEffectif":0,"sujetId":params.id,"periodeSeanceId":res.data.id} 
          this.consultationService.ajouterConsultation(consultation).subscribe((res:any)=>
          {

              this.router.navigate(['../tabs/seance'],);
          });  
        }
      });
    })

  }
}

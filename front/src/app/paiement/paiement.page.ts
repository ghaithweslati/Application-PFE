import { Component, OnInit } from '@angular/core';
import { Seance } from '../model/seance';
import { SeanceService } from '../service/seance.service';
import { PeriodeSeanceService } from '../service/periode_seance.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.page.html',
  styleUrls: ['./paiement.page.scss'],
})
export class PaiementPage implements OnInit {

  heureDeb:string;
  heureFin:string;
  date:string;
  seance:Seance=new Seance();
  constructor(private periodeSeanceServ:PeriodeSeanceService,
    private seanceService:SeanceService,
    private route:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit() {
  }

  payer()
  {
    this.seance.periode_seance.dateDeb=this.date.substr(0,10)+" "+this.heureDeb.substr(11,5);
    this.seance.periode_seance.dateFin=this.date.substr(0,10)+" "+this.heureFin.substr(11,5);
    this.periodeSeanceServ.ajouterPeriodeSeance(this.seance.periode_seance).subscribe((res:any)=>
    {
      this.route.queryParams.subscribe(params => {
        if (params) {
          const seance = {"dureeEffectif":0,"sujetId":params.id,"periodeSeanceId":res.data.id} 
          this.seanceService.ajouterSeance(seance).subscribe((res:any)=>
          {
              window.location.href = "../tabs/seance"
          });    
        }
      });
    })

  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StatusSeance } from 'src/app/Enum/StatusSeance';
import { TypeConference } from 'src/app/Enum/TypeConference';
import { Conference } from 'src/app/model/conference';
import { Sujet } from 'src/app/model/sujet';
import { ConferenceService } from 'src/app/service/conference.service';
import { PeriodeSeanceService } from 'src/app/service/periode_seance.service';
import { StorageService } from 'src/app/service/storage.service';
import { SujetService } from 'src/app/service/sujet.service';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.page.html',
  styleUrls: ['./conference.page.scss'],
})
export class ConferencePage implements OnInit {
  
  heureDeb:string ;
  heureFin:string;
  date:string;
  conference:Conference=new Conference();
  sujets:Sujet[]=[];
  type=TypeConference.Payant;
  constructor(private periodeSeanceServ:PeriodeSeanceService,
    private sujetService:SujetService,
    private storageService:StorageService,
    private conferenceService:ConferenceService,
    private route:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit() {
    this.afficherSujets();

    this.date = this.toJSONLocal(new Date()).slice(0, 10);
    this.heureDeb = this.toJSONLocal(new Date()).slice(11,16)
    this.heureFin = this.toJSONLocal(new Date()).slice(11,16)
 
  }

  ajouterConference()
  {
    this.conference.periode_seance.dateDeb=this.date.substr(0,10)+" "+this.heureDeb.substr(11,5);
    this.conference.periode_seance.dateFin=this.date.substr(0,10)+" "+this.heureFin.substr(11,5);
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


  toJSONLocal (date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON();
}

}

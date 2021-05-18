import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StatusSeance } from 'src/app/Enum/StatusSeance';
import { TypeConference } from 'src/app/Enum/TypeConference';
import { Conference } from 'src/app/model/conference';
import { Sujet } from 'src/app/model/sujet';
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

    this.date = this.toJSONLocal(new Date()).slice(0, 10);
    this.heureDeb = this.toJSONLocal(new Date()).slice(11,16)
    this.heureFin = this.toJSONLocal(new Date()).slice(11,16)
 
  }

  ajouterConference()
  {
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
    //local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON();
}


payer(): void {
  const utilisateurConnecte=JSON.parse(localStorage.getItem('user'));
  const name =utilisateurConnecte.prenom+" "+utilisateurConnecte.nom;
  this.stripeService
    .createToken(this.card.element, { name })
    .subscribe((result) => {
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
        // Error creating the token

      }
    });
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

}

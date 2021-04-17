import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IonThumbnail, ModalController } from '@ionic/angular';
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

@Component({
  selector: 'app-seance-detail',
  templateUrl: './seance-detail.page.html',
  styleUrls: ['./seance-detail.page.scss'],
})
export class SeanceDetailPage implements OnInit {

  consultation:Consultation=new Consultation();
  conference:Conference=new Conference();
  seance:Seance=new Seance();
  type="";
  utilisateurConnecte;
  constructor(private consultationService:ConsultationService,
    private conferenceService:ConferenceService,
    private participationService:ParticipationService,
    private route: ActivatedRoute,
    private router:Router,
    private modalCtrl:ModalController,
    private storageService:StorageService,
    private _sanitizer: DomSanitizer
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

        if(this.utilisateurConnecte.role=="Demandeur")
        {
          this.participationService.ajouterParticipation({"demandeurId":this.utilisateurConnecte.id,"conferenceId":this.seance.id})
        }
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


  verifierDate()
  {
    var t2 = new Date();
    var t1 = new Date(this.seance.periode_seance.dateDeb);
    var dif = t1.getTime() - t2.getTime();
    var duree = dif / 1000 /60 ;

    return (this.seance.status!=StatusSeance.Cloture)&&((duree<=30&&duree>=-30)&&new Date()<=new Date(this.seance.periode_seance.dateFin));
  }

  sommeFrais()
  {
    var t1 = new Date(this.seance.periode_seance.dateFin);
    var t2 = new Date(this.seance.periode_seance.dateDeb);
    var dif = t1.getTime() - t2.getTime();
    var minute = dif / 1000 / 60 ;
    var frais = this.seance.sujet.frais;
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
    return prix+" DT";

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

}

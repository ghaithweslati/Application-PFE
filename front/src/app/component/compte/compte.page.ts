import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { EtatUtilisateur } from 'src/app/Enum/EtatUtilisateur';
import { Domaine } from 'src/app/model/domaine';
import { Expert } from 'src/app/model/expert';
import { Utilisateur } from 'src/app/model/utilisateur';
import { AdministrateurService } from 'src/app/service/administrateur.service';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { DomaineService } from 'src/app/service/domaine.service';
import { StorageService } from 'src/app/service/storage.service';
import { Location } from '@angular/common'
import { DemandeurService } from 'src/app/service/demandeur.service';
import { ExpertService } from 'src/app/service/expert.service';


@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {

  myimage: Observable<any>;
  utilisateur:Expert=new Expert();
  domaines:Domaine[]=[];
  role;
  constructor(private domaineService:DomaineService,
    private storageService:StorageService,
    private adminService:AdministrateurService,
    private demandeurService:DemandeurService,
    private expertService:ExpertService,
    private location:Location) { }

  ngOnInit() {
    this.afficherLesDomaines();
    this.role=this.storageService.afficherUtilisateurCourant().role;
    this.utilisateur=JSON.parse(localStorage.getItem('user'));
    if(this.role=="Expert")
    {
      this.utilisateur.domaine=new Domaine();
      this.utilisateur.domaine.id=JSON.parse(localStorage.getItem('user')).domaineId;
    }
  }


  changeListener($event: Event)
  {
    const file = ($event.target as HTMLInputElement).files[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    this.myimage = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    this.myimage.subscribe((d)=>{
      this.utilisateur.photo=d;
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }


  afficherLesDomaines()
  {
    this.domaineService.afficherDomaines().subscribe((res:any)=>
    {
      this.domaines=res.data.rows;
    })
  }

  modifier()
  {
      if(this.role=="Administrateur")
      {
        this.adminService.modifierAdministrateur(this.utilisateur,this.utilisateur.id).subscribe(res=>
          {
            var utilisateurConnecte=JSON.parse(localStorage.getItem('user'));
            utilisateurConnecte.nom=this.utilisateur.nom;
            utilisateurConnecte.prenom=this.utilisateur.prenom;
            utilisateurConnecte.email=this.utilisateur.email;
            utilisateurConnecte.photo=this.utilisateur.photo;
            localStorage.setItem('user',JSON.stringify(utilisateurConnecte))
            this.location.back();
          })
      }
      else if(this.role=="Demandeur")
      {
        this.demandeurService.modifierDemandeur(this.utilisateur,this.utilisateur.id).subscribe(res=>
          {
            var utilisateurConnecte=JSON.parse(localStorage.getItem('user'));
            utilisateurConnecte.nom=this.utilisateur.nom;
            utilisateurConnecte.prenom=this.utilisateur.prenom;
            utilisateurConnecte.email=this.utilisateur.email;
            utilisateurConnecte.photo=this.utilisateur.photo;
            utilisateurConnecte.specialite=this.utilisateur.specialite;
            localStorage.setItem('user',JSON.stringify(utilisateurConnecte))
            this.location.back();
          })
      }
      else
      {
        var user=Object.assign(this.utilisateur,{'domaineId':this.utilisateur.domaine.id});
        this.expertService.modifierExpert(user,user.id).subscribe(res=>
          {
            var utilisateurConnecte=JSON.parse(localStorage.getItem('user'));
            utilisateurConnecte.nom=this.utilisateur.nom;
            utilisateurConnecte.prenom=this.utilisateur.prenom;
            utilisateurConnecte.email=this.utilisateur.email;
            utilisateurConnecte.photo=this.utilisateur.photo;
            utilisateurConnecte.domaineId=this.utilisateur.domaine.id;
            localStorage.setItem('user',JSON.stringify(utilisateurConnecte))
            this.location.back();
          })
      }
  }
}

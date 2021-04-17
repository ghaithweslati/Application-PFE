import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { EtatUtilisateur } from 'src/app/Enum/EtatUtilisateur';
import { Domaine } from 'src/app/model/domaine';
import { Expert } from 'src/app/model/expert';
import { Utilisateur } from 'src/app/model/utilisateur';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { DomaineService } from 'src/app/service/domaine.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  utilisateur:Utilisateur = new Utilisateur();
  expert:Expert=new Expert();
  domaines:Domaine[]=[];
  role:String="Demandeur";
  myimage: Observable<any>;
  constructor(private authService: AuthentificationService,
    private domaineService:DomaineService,
    private storageService:StorageService,
    private router: Router) {}

  public ngOnInit(): void {
     this.domaineService.afficherDomaines().subscribe((res:any)=>
    {
      this.domaines=res.data.rows;
    })
  }

  
  inscrire() {
    this.expert.etat=EtatUtilisateur.Actif;
    var user=Object.assign(this.expert,{'role':this.role},{'domaineId':this.expert.domaine.id});
    alert(JSON.stringify(user))
    /*
    this.authService.inscrire(user).subscribe((res:any) => {
      const nouveauUtilisateur=res.user;
      nouveauUtilisateur.role=this.role;      
      localStorage.setItem('token',res.token);
      this.storageService.setUtilisateurCourant(nouveauUtilisateur);
      this.router.navigate(['./tabs'],);
    }, 
    error => console.log(error));*/
   
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
      this.expert.photo=d;
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
}

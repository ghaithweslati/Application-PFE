import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { SujetModalPage } from 'src/app/modal/sujet-modal/sujet-modal.page';
import { Sujet } from 'src/app/model/sujet';
import { StorageService } from 'src/app/service/storage.service';
import { SujetService } from '../../service/sujet.service';


@Component({
  selector: 'app-sujet',
  templateUrl: './sujet.page.html',
  styleUrls: ['./sujet.page.scss'],
})
export class SujetPage implements OnInit {

  sujets:Sujet[]=[];
  allSujets:Sujet[]=[];
  searchVal="";
  sujet:Sujet=new Sujet();
  role="";
  constructor( private sujService:SujetService,
    private storageService:StorageService,
    private modalCtrl:ModalController,
    private router: Router) {
    
  }

  

  async openSujetModal() {
    const modal = await this.modalCtrl.create({
      component: SujetModalPage,
      cssClass: 'sujet-modal',
      backdropDismiss: false
    });
   
    await modal.present();
  
    
    modal.onDidDismiss().then((result) => {
      this.afficher();
    });
  }   

  ngOnInit() {
   this.role=this.storageService.afficherUtilisateurCourant().role;

    this.afficher();
  }

  afficher()
  {
    if(this.storageService.afficherUtilisateurCourant().role=="Demandeur")
    {
      this.sujService.afficherTousSujets().subscribe(res=>
        {
          this.sujets=res.data.rows;
          this.allSujets=this.sujets;
        });
    }
    else
    {
      const id = this.storageService.afficherUtilisateurCourant().id;
      this.sujService.afficherMesSujets(id).subscribe(res=>
        {
          this.sujets=res.data.rows;
          this.allSujets=this.sujets;
        });
    }
  }

  afficherDetail(id:number)
  {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id
      }
    };
    this.router.navigate(['../sujet-detail/'],navigationExtras);
  }

  onInput(val:string)
  {

    this.sujets=this.allSujets;
    if(val!="")
    {
      this.sujets = this.sujets.filter(function(sujet){
        return sujet.titre.toLowerCase().includes(val.toLowerCase());
      });
    }

  }
  
  onCancel()
  {
    this.sujets=this.allSujets;
  }

}

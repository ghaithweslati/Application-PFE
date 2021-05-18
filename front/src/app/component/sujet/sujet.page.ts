import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { SujetModalPage } from 'src/app/modal/sujet-modal/sujet-modal.page';
import { Expert } from 'src/app/model/expert';
import { Sujet } from 'src/app/model/sujet';
import { ExpertService } from 'src/app/service/expert.service';
import { StorageService } from 'src/app/service/storage.service';
import { SujetService } from '../../service/sujet.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ParametreModalPage } from 'src/app/modal/parametre-modal/parametre-modal.page';



@Component({
  selector: 'app-sujet',
  templateUrl: './sujet.page.html',
  styleUrls: ['./sujet.page.scss'],
})
export class SujetPage implements OnInit {

  sujets:Sujet[]=[];
  allSujets:Sujet[]=[];
  experts:Expert[]=[];
  searchVal="";
  sujet:Sujet=new Sujet();
  role="";
  titre="Sujets";
  segment="sujet";
  
  constructor( private sujService:SujetService,
    private storageService:StorageService,
    private expertService:ExpertService,
    private modalCtrl:ModalController,
    private route:ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private popCtrl:PopoverController,
    private router: Router) {
  }

  

  async openSujetModal() {
    const modal = await this.modalCtrl.create({
      component: SujetModalPage,
      cssClass: 'sujet-modal',
      componentProps: { 
        listeSujets:this.allSujets,
      },
      backdropDismiss: false
    });
   
    await modal.present();
  
    
    modal.onDidDismiss().then((result) => {
      this.afficherLesSujets();
    });
  }   

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.role=this.storageService.afficherUtilisateurCourant().role;
        this.afficherLesSujets();
      });
    this.afficherLesExperts();    

  }

  afficherLesExperts()
  {
    const role = this.storageService.afficherUtilisateurCourant().role;
    
    if(role=="Demandeur")
    {

      this.route.queryParams.subscribe(params => {
        if (params) {

          const idDomaine=params.idDomaine;
        
        this.expertService.afficherExpertsParDomaine(idDomaine).subscribe(res=>
          {
            this.experts=res.data.rows;
          });
        }
      });
    }
  }
  


  afficherLesSujets()
  {
    const role = this.storageService.afficherUtilisateurCourant().role;
    
    if(role=="Demandeur")
    {
      this.route.queryParams.subscribe(params => {
        if (params) {

          const idDomaine=params.idDomaine;
          this.titre=params.nomDomaine;
          
          this.sujService.afficherTousSujets(role,idDomaine).subscribe(res=>
            {
              this.sujets=res.data.rows;
              this.allSujets=this.sujets;
            });
        }
      });

    }
    else
    {
      const id = this.storageService.afficherUtilisateurCourant().id;
      this.sujService.afficherTousSujets(role,id).subscribe(res=>
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
    this.router.navigate(['sujet-detail'],navigationExtras);
  }

  expertDetail(id:number)
  {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id
      }
    };
    this.router.navigate(['expert'],navigationExtras);
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

  segmentChanged(ev: any) {
    this.segment = ev.target.value;
  }

  base64image(photo)
  {
    if(photo)
      return this._sanitizer.bypassSecurityTrustResourceUrl(photo);
    else
      return "assets/icon/user.png";
  }


  async initParametres(ev)
  {
      const popover = await this.popCtrl.create(
        {
          component:ParametreModalPage,
          event:ev,
        }
      )
      return await popover.present();
  }

}

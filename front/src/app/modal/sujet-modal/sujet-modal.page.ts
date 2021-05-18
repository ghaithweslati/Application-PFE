import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';

import { Frais } from 'src/app/model/frais';
import { Sujet } from 'src/app/model/sujet';
import { FraisService } from 'src/app/service/frais.service';
import { StorageService } from 'src/app/service/storage.service';
import { SujetService } from 'src/app/service/sujet.service';


@Component({
  selector: 'app-sujet-modal',
  templateUrl: './sujet-modal.page.html',
  styleUrls: ['./sujet-modal.page.scss'],
})
export class SujetModalPage implements OnInit {

  sujet:Sujet = new Sujet();
  frais15:Frais=new Frais();
  frais30:Frais=new Frais();
  frais45:Frais=new Frais();
  frais60:Frais=new Frais();
  frais15check;
  frais30check;
  frais45check;
  frais60check;
  sujetModifie;
  listeSujets:Sujet[]=[];
  constructor(private modalCtrl: ModalController,
    private sujetService:SujetService,
    private fraisService:FraisService, 
    private toastController:ToastController,
    private storageService:StorageService,
    private loadingController:LoadingController,
    ) { }

  ngOnInit() {
    const id = this.storageService.afficherUtilisateurCourant().id;
    const role = this.storageService.afficherUtilisateurCourant().role;
    this.sujetService.afficherTousSujets(role,id).subscribe((res:any)=>
    {
      this.listeSujets=res.data.rows;
    });
    this.frais15.duree=15;
    this.frais30.duree=30;
    this.frais45.duree=45;
    this.frais60.duree=60;
    if(this.sujetModifie)
    {
      this.sujet=JSON.parse(this.sujetModifie);
      for(let i=0;i<this.sujet.frais.length;i++)
      {
        switch (this.sujet.frais[i].duree)
        {
          case 15:{this.frais15=this.sujet.frais[i];this.frais15check=true;break}
          case 30:{this.frais30=this.sujet.frais[i];this.frais30check=true;break}
          case 45:{this.frais45=this.sujet.frais[i];this.frais45check=true;break}
          case 60:{this.frais60=this.sujet.frais[i];this.frais60check=true;break}
        }
      }
    };      
  }
 
  async save() { 
    
    this.sujet.frais=[];

    if(this.frais60check)
      this.sujet.frais.push(this.frais60);
          
    if(this.frais45check)
    this.sujet.frais.push(this.frais45);
        
    if(this.frais30check)
      this.sujet.frais.push(this.frais30);
          
    if(this.frais15check)
    this.sujet.frais.push(this.frais15);

      var test=false;
      for(let i=0;i<this.sujet.frais.length;i++)
        if(this.sujet.frais[i].prix<0)
        {
          test=true
          break;
        }

        if((test||this.sujet.titre==undefined||this.sujet.titre==""))
        {
          this.presentToast("Vous avez saisie des données invalides!")
        }
        else if(this.exite())
        {
          this.presentToast("Vous avez déjà un sujet portant ce même titre!")
        }
        else
        {
          
          if(this.sujet.frais.length==0)
          this.presentToast("Vous n'avez pas saisies des frais\nTous les séances ayant ce sujet seront gratuite!")
   

          if(this.sujetModifie)
          {
            const loading = await this.loadingController.create({
              message: 'Modification du sujet en cours..',
              translucent: true,
              backdropDismiss:true,
            });
            await loading.present();

              this.fraisService.supprimerFrais(this.sujet.id).subscribe();
              
  
                this.sujetService.modifierSujet(this.sujet,this.sujet.id).subscribe((res:any)=>
                {
                  loading.dismiss();
                  this.presentToast("Modification du sujet réussi"); 
                  this.modalCtrl.dismiss()     
                  for(let i=0;i<this.sujet.frais.length;i++)
                  {
                    var frais = Object.assign( this.sujet.frais[i], {'sujetId':this.sujet.id} );
                    this.fraisService.ajouterFrais(frais).subscribe(res=>{
      
                    })
                  }
                })
              
          }
          else
          {
      
            const loading = await this.loadingController.create({
              message: 'Ajout du sujet en cours..',
              translucent: true,
              backdropDismiss:true,
            });
            await loading.present();

          this.sujetService.ajouterSujet(this.sujet).subscribe((res:any)=>
            {   
              loading.dismiss();
              this.presentToast("Ajout du sujet réussi");   
              this.modalCtrl.dismiss()
              const nouvSujet = res.data;
                for(let i=0;i<this.sujet.frais.length;i++)
                {
                  var frais = Object.assign( this.sujet.frais[i], {'sujetId':nouvSujet.id} );
                  this.fraisService.ajouterFrais(frais).subscribe(res=>{
      
                  })
                }
            })

          }
      
              
        }
      
    }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color:'dark'
    });
    toast.present();
  }
 

 
 
  close() {
    this.modalCtrl.dismiss();
  }

  exite()
  {
    let i=0;
  
    if(this.sujetModifie)
    {
      while(i<this.listeSujets.length&&this.listeSujets[i].titre!=this.sujet.titre)
      i++;
      if(i<this.listeSujets.length)
        return this.listeSujets[i].id!=this.sujet.id
      
    }
    else
    {
    while(i<this.listeSujets.length&&this.listeSujets[i].titre!=this.sujet.titre)
      i++;
    return i<this.listeSujets.length;
    }
  }
  /*
  checkFrais(event,frais)
  {
   const checked=event.target.checked;
   if(checked)
   {
    this.sujet.frais.push(frais)
   }
   else
   {
    this.sujet.frais = this.sujet.frais.filter(function(el){
      return el.duree !== frais.duree;
    });
   }
   
  }


  checked()
  {
    return true;
  }*/

}

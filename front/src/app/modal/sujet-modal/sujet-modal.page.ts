import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Frais } from 'src/app/model/frais';
import { Sujet } from 'src/app/model/sujet';
import { FraisService } from 'src/app/service/frais.service';
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
  constructor(private modalCtrl: ModalController,
    private sujetService:SujetService,
    private fraisService:FraisService, 
    ) { }

  ngOnInit() {
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
 
  save() { 
    
    this.sujet.frais=[];

    if(this.frais60check)
      this.sujet.frais.push(this.frais60);
          
    if(this.frais45check)
    this.sujet.frais.push(this.frais45);
        
    if(this.frais30check)
      this.sujet.frais.push(this.frais30);
          
    if(this.frais15check)
    this.sujet.frais.push(this.frais15);

    

    if(this.sujetModifie)
    {
        this.fraisService.supprimerFrais(this.sujet.id).subscribe();
        
          this.sujetService.modifierSujet(this.sujet,this.sujet.id).subscribe((res:any)=>
          {

            for(let i=0;i<this.sujet.frais.length;i++)
            {
              var frais = Object.assign( this.sujet.frais[i], {'sujetId':this.sujet.id} );
              this.fraisService.ajouterFrais(frais).subscribe(res=>{

              })
            }
            this.modalCtrl.dismiss()
          })
        
    }
    else
    {
    this.sujetService.ajouterSujet(this.sujet).subscribe((res:any)=>
      {          
        const nouvSujet = res.data;
          for(let i=0;i<this.sujet.frais.length;i++)
          {
            var frais = Object.assign( this.sujet.frais[i], {'sujetId':nouvSujet.id} );
            this.fraisService.ajouterFrais(frais).subscribe(res=>{

            })
          }
      })
    this.modalCtrl.dismiss()
    }

  }
 
 
  close() {
    this.modalCtrl.dismiss();
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

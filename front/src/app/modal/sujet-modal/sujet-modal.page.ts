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
  constructor(private modalCtrl: ModalController,private sujetService:SujetService,private fraisService:FraisService) { }

  ngOnInit() {
    this.frais15.duree=15;
    this.frais30.duree=30;
    this.frais45.duree=45;
    this.frais60.duree=60;
  }

  modalReady = false;

 
  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;      
    }, 0);
  }
 
  save() {    
    this.sujetService.ajouterSujet(this.sujet).subscribe((res:any)=>
      {          const nouvSujet = res.data;
          for(let i=0;i<this.sujet.frais.length;i++)
          {
            var frais = Object.assign( this.sujet.frais[i], {'sujetId':nouvSujet.id} );
            this.fraisService.ajouterFrais(frais).subscribe(res=>{

            })
          }
      })
    this.modalCtrl.dismiss()
  }
 
 
  close() {
    this.modalCtrl.dismiss();
  }

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

}

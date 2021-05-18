import { ThrowStmt } from '@angular/compiler';
import { Component, AfterViewInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { PeriodeDisponibilite } from 'src/app/model/periode_disponibilite';
import { PeriodeDisponibiliteService } from 'src/app/service/periode_disponibilite.service';


 
@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements AfterViewInit {

  
  modalReady = false;
  heureDeb:string;
  heureFin:string;
  date:string;
  periode:PeriodeDisponibilite=new PeriodeDisponibilite();
  listeDisponibilite:PeriodeDisponibilite[];
  dateCourante;
  event;
  constructor(private modalCtrl: ModalController,
    private periodeDispoService:PeriodeDisponibiliteService,
    private toastController:ToastController) { }
 

  ngAfterViewInit() {

    if(this.event)
    {   
      this.date = this.toJSONLocal(this.event.startTime)
      this.heureDeb = this.toJSONLocal(this.event.startTime)
      this.heureFin = this.toJSONLocal(this.event.endTime)
    }
    else
    {

      this.date = this.toJSONLocal(new Date())
      this.heureDeb = this.toJSONLocal(new Date())
      this.heureFin = this.toJSONLocal(new Date())
    }
    setTimeout(() => {
      this.modalReady = true;     
    }, 0);
  }
 
  save() {
    this.dateCourante=this.toJSONLocal(new Date()).substr(0,10)+" "+this.toJSONLocal(new Date()).substr(11,5);
     this.periode.dateDeb=this.date.substr(0,10)+" "+this.heureDeb.substr(11,5);
    this.periode.dateFin=this.date.substr(0,10)+" "+this.heureFin.substr(11,5);
    if(this.event)
      this.modifierDisponibilite()
    else
      this.ajoutDisponibilite()
      
       
  }

  
  toJSONLocal (date) {
    var local = new Date(date);
    return local.toJSON();
}
 

  close() {
    this.modalCtrl.dismiss();
  }


  ajoutDisponibilite()
  {
    if(this.periode.dateDeb<this.dateCourante)
    {
      this.presentToast("Vous ne pouvez pas spécifier une ancienne période de disponibilite")
      return false;
    }
    if(this.periode.dateDeb>=this.periode.dateFin)
    {
      this.presentToast("La date de début doit être inférieure à la date du fin")
      return false;
    }
    if(this.listeDisponibilite.length==0)
    {
      this.periodeDispoService.ajouterPeriodeDisponibilite(this.periode).subscribe((res:any)=>
      {
        this.presentToast("Ajout du période de disponibilité réussi")
        return true;
      })
    }
    else
    {
    var flag=false;
    var i=0;
      while(flag==false&&i<this.listeDisponibilite.length)
      {
            if(this.periode.dateDeb>=this.listeDisponibilite[i].dateDeb&&this.periode.dateFin<=this.listeDisponibilite[i].dateFin)
            {
            this.presentToast("Vous êtes déjà disponible dans cette période")
                flag= true;
            }
            else if(this.periode.dateDeb<this.listeDisponibilite[i].dateDeb&&this.periode.dateFin>this.listeDisponibilite[i].dateFin)
            {
              this.presentToast("Période de disponibilité invalide")
                flag= true;   
            }
            else if(this.periode.dateDeb<this.listeDisponibilite[i].dateDeb&&this.periode.dateFin>this.listeDisponibilite[i].dateDeb)
            {
                this.presentToast("Période de disponibilité invalide")
                flag= true;
            }
            else if(this.periode.dateDeb<this.listeDisponibilite[i].dateFin&&this.periode.dateFin>this.listeDisponibilite[i].dateFin)
            {
                this.presentToast("Période de disponibilité invalide")
                flag= true;
            }
            i++;
      }
      if(flag==false)
      {
       this.periodeDispoService.ajouterPeriodeDisponibilite(this.periode).subscribe((res:any)=>
       {
         this.close();
         this.presentToast("Ajout du période de disponibilité réussi")
         flag =true;
       })
      }

    }

  }




  modifierDisponibilite()
  {
    
    if(this.periode.dateDeb<this.dateCourante)
    {

      this.presentToast("Vous ne pouvez pas spécifier une ancienne période de disponibilite")
      return false;
    }
    if(this.periode.dateDeb>=this.periode.dateFin)
    {
      this.presentToast("La date de début doit être inférieure à la date du fin")
      return false;
    }
    if(this.listeDisponibilite.length==1)
    {
      this.periodeDispoService.modifierDisponibilite(this.periode,this.event.id).subscribe((res:any)=>
      {
        this.presentToast("Modification du période de disponibilité réussi")
        return true;
      })
    }
    else
    {
    var flag=false;
    var i=0;
      while(flag==false&&i<this.listeDisponibilite.length)
      {
            if(this.periode.dateDeb>=this.listeDisponibilite[i].dateDeb&&this.periode.dateFin<=this.listeDisponibilite[i].dateFin)
            {
            this.presentToast("Vous êtes déjà disponible dans cette période")
                flag= true;
            }
            else if(this.periode.dateDeb<this.listeDisponibilite[i].dateDeb&&this.periode.dateFin>this.listeDisponibilite[i].dateFin)
            {
              this.presentToast("Période de disponibilité invalide")
                flag= true;   
            }
            else if(this.periode.dateDeb<this.listeDisponibilite[i].dateDeb&&this.periode.dateFin>this.listeDisponibilite[i].dateDeb)
            {
                this.presentToast("Période de disponibilité invalide")
                flag= true;
            }
            else if(this.periode.dateDeb<this.listeDisponibilite[i].dateFin&&this.periode.dateFin>this.listeDisponibilite[i].dateFin)
            {
                this.presentToast("Période de disponibilité invalide")
                flag= true;
            }
            i++;
      }
      if(flag==false)
      {
       this.periodeDispoService.modifierDisponibilite(this.periode,this.event.id).subscribe((res:any)=>
       {
         this.close();
         this.presentToast("Modification du période de disponibilité réussi")
         flag =true;
       })
      }

    }

  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color:'dark'
    });
    toast.present();
  }
}
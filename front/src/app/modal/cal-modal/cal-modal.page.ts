import { Component, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  constructor(private modalCtrl: ModalController,private periodeDispoService:PeriodeDisponibiliteService) { }
 

  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;      
    }, 0);
  }
 
  save() {
    this.periode.dateDeb=this.date.substr(0,10)+" "+this.heureDeb.substr(11,5);
    this.periode.dateFin=this.date.substr(0,10)+" "+this.heureFin.substr(11,5);
    this.periodeDispoService.ajouterPeriodeDisponibilite(this.periode).subscribe((res:any)=>
    {
      this.close();
    })

  }
 

  close() {
    this.modalCtrl.dismiss();
  }
}
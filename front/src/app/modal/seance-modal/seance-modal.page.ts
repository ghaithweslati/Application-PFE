import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Consultation } from 'src/app/model/consultation';
import { Seance } from 'src/app/model/seance';

@Component({
  selector: 'app-seance-modal',
  templateUrl: './seance-modal.page.html',
  styleUrls: ['./seance-modal.page.scss'],
})
export class SeanceModalPage implements AfterViewInit {

  modalReady = false;
  consultation:Consultation= new Consultation()
 constructor(private modalCtrl: ModalController) { }
 

 
  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;      
    }, 0);
  }


 noter(note)
 {
  this.consultation.note=note;
 }

 save()
 {
  this.modalCtrl.dismiss({'note':this.consultation.note});
 }

  close() {
    this.modalCtrl.dismiss();
  }
}

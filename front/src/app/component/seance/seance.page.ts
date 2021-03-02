import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalModalPage } from '../../modal/cal-modal/cal-modal.page';
import { SeanceService } from 'src/app/service/seance.service';
import { Seance } from 'src/app/model/seance';
import { PopoverPage } from 'src/app/modal/popover/popover.page';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-seance',
  templateUrl: 'seance.page.html',
  styleUrls: ['seance.page.scss']
})
export class SeancePage {

  eventSource = [];
  viewTitle: string;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  selectedDate: Date;
  id;
  role="";
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  seances:Seance[]=[];
  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private modalCtrl: ModalController,
    private seanceService:SeanceService,
    private storageService:StorageService,
    private popCtrl:PopoverController
  ) {}
 
  ngOnInit() {
    this.role=this.storageService.afficherUtilisateurCourant().role;
    this.afficher();
  }

  afficher() {

    
    this.seanceService.afficherSeance(this.role).subscribe((res:any)=>
    {
      var events=[];
        this.seances=res.data.rows;
        for(let i=0;i<this.seances.length;i++)
        {
          events.push({
            title: this.seances[i].sujet.titre,
            id:this.seances[i].id,
            startTime: new Date(this.seances[i].periode_seance.dateDeb),
            endTime: new Date(this.seances[i].periode_seance.dateFin),
            allDay: false,
          });
        }
        this.eventSource= events;
    });
  }
 
  // Change current month/week/day
  next() {
    this.myCal.slideNext();
  }
 
  back() {
    this.myCal.slidePrev();
  }
 
  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  
 
  // Calendar event was clicked
  async onEventSelected(event) {
window.location.href="http://localhost:8080/"+event.id;

  
  }

 

}

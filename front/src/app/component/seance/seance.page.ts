import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalModalPage } from '../../modal/cal-modal/cal-modal.page';
import { Seance } from 'src/app/model/seance';
import { PopoverPage } from 'src/app/modal/popover/popover.page';
import { StorageService } from 'src/app/service/storage.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { ConsultationService } from 'src/app/service/consultation.service';
import { ConferenceService } from 'src/app/service/conference.service';
import { ParametreModalPage } from 'src/app/modal/parametre-modal/parametre-modal.page';



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

  
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hideurlbar:'yes',//Or 'no'

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
    private consultationService:ConsultationService,
    private conferenceService:ConferenceService,
    private storageService:StorageService,
    private popCtrl:PopoverController,
    private route:ActivatedRoute,
    private router:Router,
    private iab: InAppBrowser
  ) {}
 
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.role=this.storageService.afficherUtilisateurCourant().role;
        this.afficher();
      });
  }

  

  afficher() {
    this.eventSource=[];
    this.afficherConsultations();
    this.afficherConferences();
  }

  afficherConsultations() {
    var events=[];
    this.seances=[];
    this.consultationService.afficherConsultations(this.role).subscribe((res:any)=>
    {
        this.seances=res.data.rows;
        for(let i=0;i<this.seances.length;i++)
        {
          events.push({
            title: "Consultation "+this.seances[i].sujet.titre,
            id:this.seances[i].id,
            type:"Consultation",
            startTime: new Date(this.seances[i].periode_seance.dateDeb),
            endTime: new Date(this.seances[i].periode_seance.dateFin),
            allDay: false,
          });
        }
        this.eventSource= this.eventSource.concat(events);
    });
  }



  afficherConferences() {
    var events=[];
    this.seances=[];
    this.conferenceService.afficherConferences(this.role).subscribe((res:any)=>
    {
        this.seances=res.data.rows;
        for(let i=0;i<this.seances.length;i++)
        {
          events.push({
            title: "Conference : \n"+this.seances[i].sujet.titre,
            id:this.seances[i].id,
            type:"Conference",
            startTime: new Date(this.seances[i].periode_seance.dateDeb),
            endTime: new Date(this.seances[i].periode_seance.dateFin),
            allDay: false,
          });
        }
        this.seances=[];
        this.eventSource= this.eventSource.concat(events);
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

let navigationExtras: NavigationExtras = {
  queryParams: {
    id: event.id,
    type:event.type
  }
};
this.router.navigate(['../seance-detail/'],navigationExtras);
  
}

ajouterConferencePage()
{

  this.router.navigate(['../conference/']);
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

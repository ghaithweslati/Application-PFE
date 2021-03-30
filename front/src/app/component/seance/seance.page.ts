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

    
    this.consultationService.afficherConsultation(this.role).subscribe((res:any)=>
    {
      var events=[];
        this.seances=res.data.rows;
        for(let i=0;i<this.seances.length;i++)
        {
          events.push({
            title: "Consultation : "+this.seances[i].sujet.titre,
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
//window.location.href="https://innovup.herokuapp.com/"+event.id;

  //this.iab.create('https://innovup.herokuapp.com/'+event.id,'_blank',this.options).show();
   
   
let navigationExtras: NavigationExtras = {
  queryParams: {
    id: event.id
  }
};
this.router.navigate(['../room/'],navigationExtras);

  
  }

 

}

import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalModalPage } from '../../modal/cal-modal/cal-modal.page';
import { PeriodeDisponibiliteService } from 'src/app/service/periode_disponibilite.service';
import { PeriodeDisponibilite } from 'src/app/model/periode_disponibilite';
import { PopoverPage } from 'src/app/modal/popover/popover.page';
import { StorageService } from 'src/app/service/storage.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-disponibilite',
  templateUrl: 'disponibilite.page.html',
  styleUrls: ['disponibilite.page.scss']
})
export class DisponibilitePage {

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
  periodes:PeriodeDisponibilite[]=[];
  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private modalCtrl: ModalController,
    private periodeService:PeriodeDisponibiliteService,
    private storageService:StorageService,
    private popCtrl:PopoverController,
    private route:ActivatedRoute,
    private router:Router
  ) {}
 
  ngOnInit() {
    this.role=this.storageService.afficherUtilisateurCourant().role;
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.id=params.expertId;
        this.afficher(this.id);
      }
    });

  }

  afficher(id?) {

    
    this.periodeService.afficherPeriodesDisponibilites(id).subscribe((res:any)=>
    {
      var events=[];
        this.periodes=res.data.rows;
        for(let i=0;i<this.periodes.length;i++)
        {
          events.push({
            title: '',
            id:this.periodes[i].id,
            startTime: new Date(this.periodes[i].dateDeb),
            endTime: new Date(this.periodes[i].dateFin),
            allDay: false,
          });
        }
        this.eventSource= events;
    });
  }

  reserver()
 {
  this.route.queryParams.subscribe(params => {
    if (params) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          id: params.id,        }
      };
      this.router.navigate(['../../paiement'],navigationExtras);
    }
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

  async afficherPeriode(event)
  {
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
 
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'De: ' + start + '<br><br>Jusqu\'à: ' + end,
      buttons: ['OK'],
    });

  
    alert.present();
  }
 
  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
  /*  let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
 
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'De: ' + start + '<br><br>Jusqu\'à: ' + end,
      buttons: ['OK'],
    });

  
    alert.present();*/

    const popover = await this.popCtrl.create(
      {
        component:PopoverPage,

      }
    )

    popover.onDidDismiss().then((data:any)=>
    {
      const action=data.data.action;
      if(action=="supprimer")
      {
        this.presentAlertConfirm(event.id)
      }
      else if(action=="afficher")
      {
        this.afficherPeriode(event);
      }
      else if(action=="modifier")
      {
        
      }
    }
    )
    return await popover.present();
    
  }

  async presentAlertConfirm(id) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation de supression',
      message: 'Voulez vous vraiment supprimer cette période',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Confirmer',
          handler: () => {

            this.periodeService.supprimerPeriode(id).subscribe(res=>{
              this.afficher();
            })
           /* this.objectService.deleteObject(id).subscribe(res=>
              {
                this.afficher(this.minDate.toISOString().slice(0,10),this.maxDate.toISOString().slice(0,10),1)
              })*/
          }
        }
      ]
    });

    await alert.present();
  }


  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
        this.afficher();
    });
  }
 

}

import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, PopoverController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalModalPage } from '../../modal/cal-modal/cal-modal.page';
import { PeriodeDisponibiliteService } from 'src/app/service/periode_disponibilite.service';
import { PeriodeDisponibilite } from 'src/app/model/periode_disponibilite';
import { PopoverPage } from 'src/app/modal/popover/popover.page';
import { StorageService } from 'src/app/service/storage.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ConsultationService } from 'src/app/service/consultation.service';
import { Consultation } from 'src/app/model/consultation';
import { ParametreModalPage } from 'src/app/modal/parametre-modal/parametre-modal.page';
import { ConferenceService } from 'src/app/service/conference.service';
import { Seance } from 'src/app/model/seance';
import {Location} from '@angular/common';

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
    private consultationService:ConsultationService,
    private conferenceService:ConferenceService,
    private storageService:StorageService,
    private popCtrl:PopoverController,
    private route:ActivatedRoute,
    private router:Router,
    private actionSheetController:ActionSheetController,
    private _location: Location
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
    this.eventSource=[];
    this.periodeService.afficherPeriodesDisponibilites(id).subscribe((res:any)=>
    {
        this.periodes=res.data.rows;
        for(let i=0;i<this.periodes.length;i++)
        {
          const periode=this.periodes[i];
          this.consultationService.afficherConsultationsParDate(periode.dateDeb,periode.dateFin).subscribe((res1:any)=>
          {          
            this.conferenceService.afficherConferencesParDate(periode.dateDeb,periode.dateFin).subscribe((res2:any)=>
            {
              const tabseances:Seance[]=(res1.data.rows).concat(res2.data.rows);

              tabseances.sort((a,b) => a.periode_seance.dateDeb > b.periode_seance.dateFin ? 1 : -1);
              var events=[];
              if(tabseances.length==0)
              {
                events.push({
                  title: '',
                  id:periode.id,
                  startTime: new Date(periode.dateDeb),
                  endTime: new Date(periode.dateFin),
                  allDay: false,
                });
              }
              else
              {

                if(periode.dateDeb!=tabseances[0].periode_seance.dateDeb)
                {
                  events.push({
                    title: '',
                    id:periode.id,
                    startTime: new Date(periode.dateDeb),
                    endTime: new Date(tabseances[0].periode_seance.dateDeb),
                    allDay: false,
                  });
                }
                for(let g=0;g<tabseances.length-1;g++)
                {
                   if(tabseances[g].periode_seance.dateFin!=tabseances[g+1].periode_seance.dateDeb)
                  {
                    events.push({
                      title: '',
                      id:periode.id,
                      startTime: new Date(tabseances[g].periode_seance.dateFin),
                      endTime: new Date(tabseances[g+1].periode_seance.dateDeb),
                      allDay: false,
                    });
                  }
                }  

                if(tabseances[tabseances.length-1].periode_seance.dateFin!=periode.dateFin)
                {
                events.push({
                  title: '',
                  id:periode.id,
                  startTime: new Date(tabseances[tabseances.length-1].periode_seance.dateFin),
                  endTime: new Date(periode.dateFin),
                  allDay: false,
                });
              }
              }
              this.eventSource=this.eventSource.concat(events);
            });


          });

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
 

 toJSONLocal (date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON();
}
  // Calendar event was clicked
  async onEventSelected(event) {

    if(this.role=="Expert")
    {
      const actionSheet = await this.actionSheetController.create({
        header: 'Gestion du disponibilité',
        cssClass: 'my-custom-class',
        buttons: [
          {
            text: 'Afficher',
            role: 'create',
            icon: 'clipboard',
            handler: () => {
              this.afficherPeriode(event);
            }
          },
          {
          text: 'Supprimer',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.presentAlertConfirm(event.id)
          }
        }, {
          text: 'Modifier',
          icon: 'create',
          handler: () => {
            this.alertModifier(event);
          }
        },
        {
          text: 'Annuler',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }


  else
  {
   const date = this.toJSONLocal(event.startTime).slice(0, 10);
   const heureMin = this.toJSONLocal(event.startTime).slice(11,16)
   const heureMax = this.toJSONLocal(event.endTime).slice(11,16)


  this.route.queryParams.subscribe(params => {
    if (params) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          id: params.id,  
          date:date,
          heureMax:heureMax,
          heureMin:heureMin,
        
        }
      };
      this.router.navigate(['paiement'],navigationExtras);
    }
  });
  }
    
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
      componentProps: { 
        listeDisponibilite: this.periodes,
      },
      backdropDismiss: false
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
        this.afficher();
    });
  }
 

  async alertModifier(event) {
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      componentProps: { 
        listeDisponibilite: this.periodes,
        event:event
      },
      backdropDismiss: false
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
        this.afficher();
    });
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
  

  backPage()
  {
    this._location.back();

  }
 

}


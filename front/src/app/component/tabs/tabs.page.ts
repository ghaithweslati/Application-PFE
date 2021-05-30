import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';
import { interval } from 'rxjs';
import { NotificationService } from 'src/app/service/notification.service';
import { Notification } from 'src/app/model/notification';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  role="";
  nbNotification=0;
  notifications:Notification[]=[];
  mesNotifs=[];
  notifsNonVu=[];
  notif:Notification=new Notification();
  constructor(private storageService:StorageService,private notificationService:NotificationService) {
  }


  ngOnInit(): void {
      this.role=this.storageService.afficherUtilisateurCourant().role;
      

      interval(5000).subscribe(x => {
        if( window.location.href.includes('tabs'))
        {
            this.afficher();
        }
 
    });
    
  }


 vuNotif()
  {
    this.notifsNonVu=[];
    this.mesNotifs=[];
    this.notifications=[];
    window.location.href='../tabs/notification'   
  }

  verifBadge()
  {
    return this.notifsNonVu.length>0&&window.location.href.includes("notification")==false
  }

  afficher()
  {
    this.notificationService.afficherNotifications().subscribe((res:any)=>
    {
      if(this.notifications.length!=res.data.rows.length)
      {
      this.notifications=res.data.rows;
      for(let i=0;i<this.notifications.length;i++)
      {
        this.notif=this.notifications[i];
        if(this.notif.consultation)
        {
          if(this.notif.consultation.sujet.expert.id==this.storageService.afficherUtilisateurCourant().id)
          {
            if(this.notif.texte=="a réservé une consultation")
            {
              if(this.role=="Expert")
              {
                if(this.notif.vu==false)
                  this.notifsNonVu.push(this.notif);
                const maNotif={'id':this.notif.id,'seance':this.notif.consultation.id,'texte':" "+this.notif.texte+" ","date":this.notif.date,"sujet":this.notif.consultation.sujet.titre,"user":this.notif.consultation.demandeur.prenom+" "+this.notif.consultation.demandeur.nom,"photo":this.notif.consultation.demandeur.photo,'type':'Consultation'}
                this.mesNotifs.unshift(maNotif);
              }
            }
          }
        }
        else
        {
          if(this.notif.texte=="a planifié une conférence")
          {
            if(this.role=="Demandeur")
            {
              if(this.notif.vu==false)
                this.notifsNonVu.push(this.notif);
              const maNotif={'id':this.notif.id,'seance':this.notif.conference.id,'texte':" "+this.notif.texte+" ","date":this.notif.date,"sujet":this.notif.conference.sujet.titre,"user":this.notif.conference.sujet.expert.prenom+" "+this.notif.conference.sujet.expert.nom,"photo":this.notif.conference.sujet.expert.photo,'type':'Conference'}
              this.mesNotifs.unshift(maNotif);
            }
          }
          else
          {
            if(this.notif.conference.sujet.expert.id==this.storageService.afficherUtilisateurCourant().id)
            {
                if(this.role=="Expert")
                {
                  if(this.notif.vu==false)
                    this.notifsNonVu.push(this.notif);
                  const user=this.notif.conference.demandeurs[this.notif.conference.demandeurs.length-1];
                  const maNotif={'id':this.notif.id,'seance':this.notif.conference.id,'texte':" "+this.notif.texte+" ","date":this.notif.date,"sujet":this.notif.conference.sujet.titre,"user":user.prenom+" "+user.nom,"photo":user.photo,'type':'Conference'}
                  this.mesNotifs.unshift(maNotif);
                }
              }
          }
        }
      }
    }
    })
  }




}

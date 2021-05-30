import { Component, OnInit } from "@angular/core";
import { NotificationService } from "src/app/service/notification.service";
import { StorageService } from "src/app/service/storage.service";
import { Notification } from "src/app/model/notification";
import { DomSanitizer } from "@angular/platform-browser";
import { NavigationExtras, Router } from "@angular/router";
import { ParametreModalPage } from "src/app/modal/parametre-modal/parametre-modal.page";
import { PopoverController } from "@ionic/angular";



@Component({
  selector: 'app-notification',
  templateUrl: 'notification.page.html',
  styleUrls: ['notification.page.scss']
})
export class NotificationPage implements OnInit{

  notifications:Notification[]=[];
  mesNotifs=[];
  notif:Notification=new Notification();

  role;
  id;
  constructor(private notificationService:NotificationService,
    private storageService:StorageService,
    private router:Router,
    private _sanitizer: DomSanitizer,
    private popCtrl:PopoverController,
    ) {
      this.afficher();

    }

  public ngOnInit(): void {
    this.role=this.storageService.afficherUtilisateurCourant().role;
    this.id=this.storageService.afficherUtilisateurCourant().id;
  }

  afficher()
  {
    this.notificationService.afficherNotifications().subscribe((res:any)=>
    {
      this.notifications=res.data.rows;
      for(let i=0;i<this.notifications.length;i++)
      {
        this.notif=this.notifications[i];
        if(this.notif.consultation)
        {
          if(this.notif.consultation.sujet.expert.id==this.id)
          {
            if(this.notif.texte=="a réservé une consultation")
            {
              if(this.role=="Expert")
              {
                if(this.notif.vu==false)
                {
                  this.notif.vu=true;
                  this.notificationService.modifierNotification(this.notif,this.notif.id).subscribe();
                }
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
              {
                this.notif.vu=true;
              this.notificationService.modifierNotification(this.notif,this.notif.id).subscribe();
              }
              const maNotif={'id':this.notif.id,'seance':this.notif.conference.id,'texte':" "+this.notif.texte+" ","date":this.notif.date,"sujet":this.notif.conference.sujet.titre,"user":this.notif.conference.sujet.expert.prenom+" "+this.notif.conference.sujet.expert.nom,"photo":this.notif.conference.sujet.expert.photo,'type':'Conference'}
              this.mesNotifs.unshift(maNotif);
            }
          }
          else
          {
            if(this.notif.conference.sujet.expert.id==this.id)
            {
                if(this.role=="Expert")
                {
                  if(this.notif.vu==false)
                  {
                    this.notif.vu=true;
                   this.notificationService.modifierNotification(this.notif,this.notif.id).subscribe();
                  }
                  const user=this.notif.conference.demandeurs[this.notif.conference.demandeurs.length-1];
                  const maNotif={'id':this.notif.id,'seance':this.notif.conference.id,'texte':" "+this.notif.texte+" ","date":this.notif.date,"sujet":this.notif.conference.sujet.titre,"user":user.prenom+" "+user.nom,"photo":user.photo,'type':'Conference'}
                  this.mesNotifs.unshift(maNotif);
                }
              }
          }
        }
      }
    })

  }


  base64image(photo)
  {
    if(photo)
      return this._sanitizer.bypassSecurityTrustResourceUrl(photo);
    else
      return "assets/icon/user.png";
  }

goSeance(notification)
{
  let navigationExtras: NavigationExtras = {
    queryParams: {
      id: notification.seance,
      type:notification.type,    }
  };
  this.router.navigate(['../seance-detail'],navigationExtras);
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

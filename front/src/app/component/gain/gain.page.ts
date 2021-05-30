import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { ParametreModalPage } from "src/app/modal/parametre-modal/parametre-modal.page";
import { Conference } from "src/app/model/conference";
import { Consultation } from "src/app/model/consultation";
import { Seance } from "src/app/model/seance";
import { ConferenceService } from "src/app/service/conference.service";
import { ConsultationService } from "src/app/service/consultation.service";



@Component({
  selector: 'app-gain',
  templateUrl: 'gain.page.html',
  styleUrls: ['gain.page.scss']
})
export class GainPage implements OnInit{

  consultations:Consultation[]=[];
  conferences:Conference[]=[];
  statistique={};
  tabStatistique=[];
  dureeTotal=0;
  gainTotal=0;
  constructor(private consultationService:ConsultationService,
    private conferenceService:ConferenceService,
    private popCtrl:PopoverController,
    ) {}

  public ngOnInit(): void {

    this.consultationService.afficherConsultations("Statistique").subscribe((res:any)=>
    {
      this.consultations=res.data.rows;

      for(let i=0;i<this.consultations.length;i++)
      {
        if(this.statistique[this.consultations[i].periode_seance.dateDeb.substring(0,10)])
          this.statistique[this.consultations[i].periode_seance.dateDeb.substring(0,10)]+=this.calculeGain(this.consultations[i]);
        else
          this.statistique[this.consultations[i].periode_seance.dateDeb.substring(0,10)]=this.calculeGain(this.consultations[i]);
      }

      this.conferenceService.afficherConferences("Statistique").subscribe((res:any)=>
      {
        this.conferences=res.data.rows;
        for(let i=0;i<this.conferences.length;i++)
        {
          if(this.statistique[this.conferences[i].periode_seance.dateDeb.substring(0,10)])
              this.statistique[this.conferences[i].periode_seance.dateDeb.substring(0,10)]+=this.calculeGain(this.conferences[i]);
          else
            this.statistique[this.conferences[i].periode_seance.dateDeb.substring(0,10)]=this.calculeGain(this.conferences[i]);
        
        }
        //this.tabStatistique=Object.entries(this.statistique).sort((a:any,b:any) => b[0]-a[0])

        this.tabStatistique = Object.entries(this.statistique).sort(function(a,b){
          return new Date(b[0]).valueOf() - new Date(a[0]).valueOf();
        });
        

      });
    });


 }

  
 calculeGain(seance:Seance)
  {

    var t1 = new Date(seance.periode_seance.dateFin);
    var t2 = new Date(seance.periode_seance.dateDeb);
    var dif = t1.getTime() - t2.getTime();
    var minute = dif / 1000 / 60 ;
    this.dureeTotal+=minute;
    var frais = seance.sujet.frais;
    frais.sort((a,b) => a.duree < b.duree ? 1 : -1);
    var prix =0;
    var i = 0;
   

    while(i<frais.length)
    {
      if(minute>=frais[i].duree)
      {
        minute-=frais[i].duree;
        prix+=frais[i].prix;
      }
      else
        i++;
    }
    this.gainTotal+=prix;
    return prix;

  }


  convertDuree()
  {
    var d = new Date();
    d = new Date(d.getTime() + this.dureeTotal * 60 * 1000);
    var countDownDate:any = d;


        var now = new Date().getTime();
        var distance = countDownDate - now;
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        return hours + "h:" + minutes + "m:" + seconds+"s";

  }


  triArray(tab)
  {
    return Object.entries(tab).sort((a:any,b:any) => b[0]-a[0])
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

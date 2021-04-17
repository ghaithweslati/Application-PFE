import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActionSheetController, AlertController, PopoverController } from '@ionic/angular';
import { ParametreModalPage } from 'src/app/modal/parametre-modal/parametre-modal.page';
import { Domaine } from 'src/app/model/domaine';
import { DomaineService } from 'src/app/service/domaine.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-domaine',
  templateUrl: './domaine.page.html',
  styleUrls: ['./domaine.page.scss'],
})
export class DomainePage implements OnInit {

  role;
  domaine:Domaine=new Domaine();
  constructor(private domaineService:DomaineService,
    private router:Router,
    private alertController:AlertController,
    private popCtrl:PopoverController,
    private actionSheetController:ActionSheetController,
    private storageService:StorageService) { }

  domaines:Domaine[]=[];

  ngOnInit() {
    this.afficherDomaine();
  }

  actionDomaine(domaine:Domaine)
  {

    if(this.role=="Demandeur")
    {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        idDomaine: domaine.id,
        nomDomaine:domaine.nom
      }
    };
    this.router.navigate(['./tabs/sujet/'],navigationExtras);
    }
    else
    {
      this.gestionDomaine(domaine);
    }
  }
  


  async  modifierDomainePage(domaine:Domaine) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modifier domaine',
      inputs: [
        {
          name: 'nom',
          type: 'text',
          value:domaine.nom,
          placeholder: 'Nom du domaine'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
   
          }
        }, {
          text: 'Confirmer',
          handler: (data) => {
            domaine.nom=data.nom;
            this.modifierDomaine(domaine);
          }
        }
      ]
    });

    await alert.present();
  }



  async  ajouterDomainePage() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ajouter domaine',
      inputs: [
        {
          name: 'nom',
          type: 'text',
          placeholder: 'Nom du domaine'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
   
          }
        }, {
          text: 'Confirmer',
          handler: (alertData) => {
            this.domaine.nom=alertData.nom;
            this.ajouterDomaine();
          }
        }
      ]
    });

    await alert.present();
  }



  ajouterDomaine()
  {
    this.domaineService.ajouterDomaine(this.domaine).subscribe((res:any)=>
    {
      this.afficherDomaine();
    })
  }

  modifierDomaine(domaine:Domaine)
  {
    this.domaineService.modifierDomaine(domaine,domaine.id).subscribe((res:any)=>
    {
      this.afficherDomaine();
    })
  }

  supprimerDomaine(id)
  {
    this.domaineService.supprimerDomaine(id).subscribe((res:any)=>
    {
      this.afficherDomaine();
    })
  }

  afficherDomaine()
  {
    this.role=this.storageService.afficherUtilisateurCourant().role
    this.domaineService.afficherDomaines().subscribe((res:any)=>
    { 
      this.domaines=res.data.rows;
    });
  }



    async gestionDomaine(domaine:Domaine) {
      const actionSheet = await this.actionSheetController.create({
        header: 'Gestion du domaine',
        cssClass: 'my-custom-class',
        buttons: [{
          text: 'Supprimer',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.presentAlertConfirm(domaine);
          }
        }, {
          text: 'Modifier',
          icon: 'create',
          handler: () => {
            this.modifierDomainePage(domaine);
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



    async presentAlertConfirm(domaine:Domaine) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Suppression du domaine',
        message: 'Voulez vous vraiment supprimer <strong>'+domaine.nom+'</strong>!!!',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Confirmer',
            handler: () => {
              this.supprimerDomaine(domaine.id);
            }
          }
        ]
      });
      await alert.present();
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

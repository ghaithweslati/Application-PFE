import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Domaine } from 'src/app/model/domaine';
import { DomaineService } from 'src/app/service/domaine.service';

@Component({
  selector: 'app-domaine',
  templateUrl: './domaine.page.html',
  styleUrls: ['./domaine.page.scss'],
})
export class DomainePage implements OnInit {

  constructor(private domaineService:DomaineService,private router:Router) { }

  domaines:Domaine[]=[];
  ngOnInit() {
    this.domaineService.afficherDomaines().subscribe((res:any)=>
    { 
      this.domaines=res.data.rows;
    });
  }

  goPageSujet(domaine:Domaine)
  {


    let navigationExtras: NavigationExtras = {
      queryParams: {
        idDomaine: domaine.id,
        nomDomaine:domaine.nom
      }
    };
    this.router.navigate(['./tabs/sujet/'],navigationExtras);
  }
  
}

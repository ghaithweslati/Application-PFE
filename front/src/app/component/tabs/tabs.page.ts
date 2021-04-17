import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  role="";
  constructor(private storageService:StorageService) {
  }


  ngOnInit(): void {
      this.role=this.storageService.afficherUtilisateurCourant().role
  }


  
}

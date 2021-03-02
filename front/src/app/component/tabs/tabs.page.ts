import { Component } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  role="";
  constructor(private storageService:StorageService) {
    this.role=this.storageService.afficherUtilisateurCourant().role;
  }

}

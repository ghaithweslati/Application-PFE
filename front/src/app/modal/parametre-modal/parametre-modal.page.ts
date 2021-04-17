import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-parametre-modal',
  templateUrl: './parametre-modal.page.html',
  styleUrls: ['./parametre-modal.page.scss'],
})
export class ParametreModalPage implements OnInit {

  constructor(private router:Router,private popCtrl:PopoverController) { }

  ngOnInit() {
  }

  deconnexion()
  {
      localStorage.clear();
      this.router.navigate(['../login']);
      this.popCtrl.dismiss();
  }

  redirectPageCompte()
  {
      this.router.navigate(['../compte']);
      this.popCtrl.dismiss();
  }

}

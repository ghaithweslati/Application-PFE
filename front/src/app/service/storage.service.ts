import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor() { }

  setUtilisateurCourant(user)
  {
    localStorage.setItem('user', JSON.stringify(user));;
  }
  

  afficherUtilisateurCourant():any
  {
    return JSON.parse(localStorage.getItem('user'));
  }
}
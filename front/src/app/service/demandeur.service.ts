import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeurService {

  public baseUrl = 'https://ghaith-weslati.herokuapp.com/demandeur';

  constructor(private http: HttpClient) { 
  }

  afficherDemandeurs(): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.get(`${this.baseUrl}`,{ headers: reqHeader });
  }

  modifierDemandeur(demandeur:Object,id: number): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.put(`${this.baseUrl}/${id}`,demandeur, { headers: reqHeader });
  }


}
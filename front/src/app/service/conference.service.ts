import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {

  public baseUrl = 'https://ghaith-weslati.herokuapp.com/conference';


  constructor(private http: HttpClient) { 
  }


  ajouterConference(object: Object): Observable<Object> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.post(`${this.baseUrl}/`, object, { headers: reqHeader });
  }

  afficherConference(id): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
      return this.http.get(`${this.baseUrl}/detail/${id}`,{ headers: reqHeader });
  }

  afficherConferences(role): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
      return this.http.get(`${this.baseUrl}/all/${role}`,{ headers: reqHeader });
  }

  modifierConference(object,id): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
      return this.http.put(`${this.baseUrl}/${id}`,object,{ headers: reqHeader });
  }


  afficherConferencesParDate(dateDeb,dateFin): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
      return this.http.get(`${this.baseUrl}/${dateDeb}/${dateFin}`,{ headers: reqHeader });
  }



 /* afficherConsultation(role): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
      return this.http.get(`${this.baseUrl}/${role}`,{ headers: reqHeader });
  }*/


  /*
  afficherSeance(role): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
      return this.http.get(`${this.baseUrl}/${role}`,{ headers: reqHeader });
  }*/

}
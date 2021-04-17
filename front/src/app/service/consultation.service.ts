import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  public baseUrl = 'https://ghaith-weslati.herokuapp.com/consultation';


  constructor(private http: HttpClient) { 
  }


  ajouterConsultation(object: Object): Observable<Object> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.post(`${this.baseUrl}/`, object, { headers: reqHeader });
  }

  afficherConsultations(role): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
      return this.http.get(`${this.baseUrl}/all/${role}`,{ headers: reqHeader });
  }

  afficherConsultationsParDate(dateDeb,dateFin): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
      return this.http.get(`${this.baseUrl}/${dateDeb}/${dateFin}`,{ headers: reqHeader });
  }

  afficherConsultation(id): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
      return this.http.get(`${this.baseUrl}/detail/${id}`,{ headers: reqHeader });
  }

  modifierConsultation(object,id): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
      return this.http.put(`${this.baseUrl}/${id}`,object,{ headers: reqHeader });
  }


  /*
  afficherSeance(role): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
      return this.http.get(`${this.baseUrl}/${role}`,{ headers: reqHeader });
  }*/

}
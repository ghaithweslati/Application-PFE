import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {

  public baseUrl = 'https://ghaith-weslati.herokuapp.com/expert';

  constructor(private http: HttpClient) { 
  }

  afficherExperts(): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.get(`${this.baseUrl}`,{ headers: reqHeader });
  }

  afficherExpertsParDomaine(domaine): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.get(`${this.baseUrl}/${domaine}`,{ headers: reqHeader });
  }

  modifierExpert(expert:Object,id: number): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.put(`${this.baseUrl}/${id}`,expert, { headers: reqHeader });
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SujetService {

  public baseUrl = 'https://ghaith-weslati.herokuapp.com/sujet';

  constructor(private http: HttpClient) { 
  }



  ajouterSujet(object: Object): Observable<Object> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.post(`${this.baseUrl}/`, object, { headers: reqHeader });
  }


  afficherSujet(id: number): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.get(`${this.baseUrl}/${id}`, { headers: reqHeader });
  }

  supprimerSujet(id: number): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: reqHeader });
  }



  afficherTousSujets(role,id): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.get(`${this.baseUrl}/${role}/${id}`,{ headers: reqHeader });
  }
}
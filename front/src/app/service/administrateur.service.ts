import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrateurService {

  public baseUrl = 'https://ghaith-weslati.herokuapp.com/administrateur';

  constructor(private http: HttpClient) { 
  }

  afficherAdministrateurs(): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.get(`${this.baseUrl}`,{ headers: reqHeader });
  }

  afficherAdministrateur(id: number): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.get(`${this.baseUrl}/${id}`,{ headers: reqHeader });
  }

  modifierAdministrateur(admin:Object,id: number): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.put(`${this.baseUrl}/${id}`,admin, { headers: reqHeader });
  }


}
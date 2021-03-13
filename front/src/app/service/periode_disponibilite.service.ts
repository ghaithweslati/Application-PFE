import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodeDisponibiliteService {

  public baseUrl = 'https://ghaith-weslati.herokuapp.com/periode_disponibilite';


  constructor(private http: HttpClient) { 
  }

  
  ajouterPeriodeDisponibilite(object: Object): Observable<Object> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.post(`${this.baseUrl}/`, object, { headers: reqHeader });
  }

  supprimerPeriode(id: number): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: reqHeader });
  }
  
  
  afficherPeriodesDisponibilites(id?): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    if(id)
      return this.http.get(`${this.baseUrl}/${id}`,{ headers: reqHeader });
    else
      return this.http.get(`${this.baseUrl}`,{ headers: reqHeader });
  }

}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DomaineService {

  public baseUrl = 'https://ghaith-weslati.herokuapp.com/domaine';

  constructor(private http: HttpClient) { 
 
  }


  ajouterDomaine(object: Object): Observable<Object> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.post(`${this.baseUrl}/`, object, { headers: reqHeader });
  }
    
  afficherDomaines(): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.baseUrl}`,{ headers: reqHeader });
  }

  
  modifierDomaine(sujet:Object,id: number): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.put(`${this.baseUrl}/${id}`,sujet, { headers: reqHeader });
  }

  supprimerDomaine(id: number): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: reqHeader });
  }

}
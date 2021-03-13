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

    
  afficherDomaines(): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.baseUrl}`,{ headers: reqHeader });
  }

}
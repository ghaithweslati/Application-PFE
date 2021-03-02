import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private baseUrl = 'http://localhost:8080/auth';


  constructor(private http: HttpClient) { 

  }


  login(user: Object): Observable<Object> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/login`, user, { headers: reqHeader });
  }

  inscrire(user: Object): Observable<Object> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/signup`, user, { headers: reqHeader });
  }

}
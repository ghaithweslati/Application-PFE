import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compte } from '../model/compte';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  private baseUrl = 'https://ghaith-weslati.herokuapp.com/compte';


  constructor(private http: HttpClient) { 

  }

  getCompte(compte: Object): Observable<Object> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}`, compte, { headers: reqHeader });
  }

  modifierCompte(compte:Object,id: number): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.put(`${this.baseUrl}/${id}`,compte, { headers: reqHeader });
  }

}
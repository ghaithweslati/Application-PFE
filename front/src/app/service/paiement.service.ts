import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  public baseUrl = 'https://ghaith-weslati.herokuapp.com/paiement';


  constructor(private http: HttpClient) { 

  }


  payer(token: Object): Observable<Object> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}`, token, { headers: reqHeader });
  }


}
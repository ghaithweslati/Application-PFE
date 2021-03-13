import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodeSeanceService {

  public baseUrl = 'https://ghaith-weslati.herokuapp.com/periode_seance';


  constructor(private http: HttpClient) { 
  }

  
  
  ajouterPeriodeSeance(object: Object): Observable<Object> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.post(`${this.baseUrl}/`, object, { headers: reqHeader });
  }


}
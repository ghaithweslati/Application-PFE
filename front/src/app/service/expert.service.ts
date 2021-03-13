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
}
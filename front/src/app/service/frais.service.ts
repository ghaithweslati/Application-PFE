import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FraisService {

  public baseUrl = 'https://ghaith-weslati.herokuapp.com/frais';
//  private token="";

  constructor(private http: HttpClient) { 
 
  }

    
  ajouterFrais(object: Object): Observable<Object> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    return this.http.post(`${this.baseUrl}/`, object, { headers: reqHeader });
  }
}
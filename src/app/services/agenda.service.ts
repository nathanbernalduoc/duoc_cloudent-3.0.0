import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private jsonAgenda = 'https://test-project-eb5c0-default-rtdb.firebaseio.com/agenda.json';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 105de06f-0881-488b-b15d-3692aed6f257'
    })
  }

  constructor(private http: HttpClient) { }

  getAgenda(): Observable<any> {
    return this.http.get(this.jsonAgenda);
  }

  setAgenda(agenda: any[]): Observable<any> {
    return this.http.post(this.jsonAgenda, agenda);
  }

}

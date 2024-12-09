import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private jsonPacientes = 'https://test-project-eb5c0-default-rtdb.firebaseio.com/pacientes.json';

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<any> {
    return this.http.get(this.jsonPacientes);
  }

}

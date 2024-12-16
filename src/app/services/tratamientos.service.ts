import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TratamientosService {

  private jsonTratamientos = 'https://test-project-eb5c0-default-rtdb.firebaseio.com/tratamientos.json';

  constructor(private http: HttpClient) { }

  getTratamientos(): Observable<any> {
    return this.http.get(this.jsonTratamientos);
  }

  setTratamiento(tratamiento: any[]): Observable<any> {
    return this.http.post(this.jsonTratamientos, tratamiento);
  }

}

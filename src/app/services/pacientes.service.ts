import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  private jsonPacientes = 'https://test-project-eb5c0-default-rtdb.firebaseio.com/pacientes.json';

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<any> {
    return this.http.get(this.jsonPacientes);
  }

  setPaciente(listaPacientes:any[]) {

    this.http.post(this.jsonPacientes, listaPacientes).subscribe(
      response => {
        console.log('Archivo JSON sobrescrito con exito', response);
      },
      error => {
        console.error('Error al sobrescribir el archivo JSON', error);
      });
      
  }

}

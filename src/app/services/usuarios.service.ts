import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private jsonUsuarios = 'https://test-project-eb5c0-default-rtdb.firebaseio.com/usuarios.json';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get(this.jsonUsuarios);
  }

}

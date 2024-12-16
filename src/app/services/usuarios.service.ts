import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 105de06f-0881-488b-b15d-3692aed6f2570'
    })
  }

  private jsonUsuarios = 'https://test-project-eb5c0-default-rtdb.firebaseio.com/usuarios.json';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get(this.jsonUsuarios);
  }

  setUsuarios(usuario: any[]): Observable<any> {
    return this.http.post(this.jsonUsuarios, usuario);
  }

}

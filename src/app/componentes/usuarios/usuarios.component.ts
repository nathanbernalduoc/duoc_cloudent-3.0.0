import { Component } from '@angular/core';
import { formatDate, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @descripcion
 * Administración de usuarios
 * 
 * Permite  mandener usuarios
 * 
 */

/**
 * 
 * @usageNotes
 * 
 * Agregar usuarios
 * Quitar usuarios
 * Usuarios almacenados en un arreglo temporal
 * La recuperación de contraseña se encuentra en el login, boton "Recuperar contraseña"
 */

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule, HttpClientModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  providers: [UsuariosService]
})

export class UsuariosComponent {

  jsonUrl = 'firebasestorage.googleapis.com/v0/b/test-project-eb5c0.firebasestorage.app/o/usuarios.json?alt=media&token=105de06f-0881-488b-b15d-3692aed6f257';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 105de06f-0881-488b-b15d-3692aed6f257'
    })
  }

  usuario: any = {};
  usuarios: any[] = [];
  usuarioForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private jsonUsuarios: UsuariosService, private http: HttpClient) {}

  ngOnInit(): void {

    console.log('Usuarios');

    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.pattern(/[0-9]/), Validators.pattern(/[A-Z]/) , Validators.pattern(/[$#]/), Validators.minLength(6), Validators.maxLength(10)]],
      rol: ['', Validators.required],
    });

    this.jsonUsuarios.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });

  }

  getUsuario(): Observable<any> {

    return this.http.get(this.jsonUrl); 

  }

  submitForm(): void {
    if (!this.usuarioForm.valid) {
      alert('Revise los datos proporcionados, se han encontrado errores de validaciones.');
    } else {
      console.log('Guardando usuario.');
      this.setUsuario();
    }
  }

  setUsuario(): void {

    var nombre = this.usuarioForm.get('nombre')!.value;
    var usuario = this.usuarioForm.get('usuario')!.value;
    var contrasena = this.usuarioForm.get('contrasena')!.value;
    var rol = this.usuarioForm.get('rol')!.value;

    this.usuario.nombre = nombre;
    this.usuario.usuario = usuario;
    this.usuario.contrasena = contrasena;
    this.usuario.rol = rol;

    

    this.getUsuario();
    
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

  }

  unsetUsuario(id: number): void {

    console.log('Quitando Usuarios '+id);

    this.usuarios.splice(id, 1);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

  } 

}

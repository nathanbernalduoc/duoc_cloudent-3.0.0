import { Component } from '@angular/core';
import { formatDate, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { HttpClientModule } from '@angular/common/http';

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

  usuario: any = {};
  usuarios: any[] = [];
  usuarioForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private jsonUsuarios: UsuariosService) {}

  ngOnInit(): void {

    console.log('Usuarios');

    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      rol: ['', Validators.required],
    });

    this.jsonUsuarios.getUsuarios().subscribe(
      data=> {
        console.log(data);
        this.usuarios = data;
      }
    )

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
    this.usuario.rol = contrasena;

    this.usuarios.push(this.usuario);

    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

  }

  unsetUsuario(id: number): void {

    console.log('Quitando Usuarios '+id);

    this.usuarios.splice(id, 1);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

  } 

}

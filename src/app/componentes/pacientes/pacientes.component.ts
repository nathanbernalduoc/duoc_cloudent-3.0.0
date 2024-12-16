import { Component } from '@angular/core';
import { formatDate, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { PacientesService } from '../../services/pacientes.service';
import { Observable } from 'rxjs';

/**
 * @descripcion
 * Administración de pacientes
 * 
 * Permite administrar los usuarios para ser usados
 * en la agendamiento de horaras.
 * 
 */

/**
 * 
 * @usageNotes
 * 
 * Agregar pacientes
 * Quitar pacientes
 * Pacientes almacenados en un arreglo temporal
 *
 **/


@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule, HttpClientModule],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css',
  providers: [PacientesService]
})

export class PacientesComponent {

  paciente: any = {};
  pacientes: any[] = [];
  pacienteForm!: FormGroup;
  p: string = '';
  jsonResponse: any[] = [];

  constructor(private router: Router, private fb: FormBuilder, private jsonPacientes: PacientesService, private http: HttpClient) {}

  ngOnInit(): void {

    console.log('Pacientes');

    this.pacienteForm = this.fb.group({
      rut: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: [''],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.getPacientes();

  }

  getPacientes(): void {

    console.log('Recuperando Pacientes...');

    var json: any[] = [];

    this.pacientes = [];

    this.jsonPacientes.getPacientes().subscribe(
      (data) => {
        let clave = Object.keys(data); 

        console.log(clave);

        for(let i=0; i< clave.length; i++){
          console.log(clave[i]+" "+data[clave[i]].nombres);

          this.paciente = {};
          this.paciente.rut = data[clave[i]].rut;
          this.paciente.nombres = data[clave[i]].nombres;
          this.paciente.apellidos = data[clave[i]].apellidos;
          this.paciente.direccion = data[clave[i]].direccion;
          this.paciente.telefono = data[clave[i]].telefono;
          this.paciente.email = data[clave[i]].email;
          this.pacientes.push(this.paciente);

        }

      }
    );

  }

  submitForm(): void {
    if (!this.pacienteForm.valid) {
      alert('Revise los datos proporcionados, se han encontrado errores de validaciones.');
    } else {
      console.log('Guardando paciente.');
      this.setPaciente(this.paciente);
    }
  }

  setPaciente(paciente: any[]): void {

    const cantidad = this.pacientes.length;

    this.paciente.rut = this.pacienteForm.get('rut')!.value;
    this.paciente.nombres = this.pacienteForm.get('nombres')!.value;
    this.paciente.apellidos = this.pacienteForm.get('apellidos')!.value;
    this.paciente.direccion = this.pacienteForm.get('direccion')!.value;
    this.paciente.telefono = this.pacienteForm.get('telefono')!.value;
    this.paciente.email = this.pacienteForm.get('email')!.value;


    this.pacientes.push(this.paciente);

    console.log(this.pacientes);

    this.jsonPacientes.setPaciente(this.paciente);

    //this.getPacientes();

    localStorage.setItem('pacientes', JSON.stringify(this.paciente));

  }

  unsetCliente(id: number): void {

    console.log('Quitando pacientes '+id);

    this.pacientes.splice(id, 1);
    localStorage.setItem('pacientes', JSON.stringify(this.pacientes));

  } 

}

import { Component } from '@angular/core';
import { formatDate, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PacientesService } from '../../services/pacientes.service';

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

  constructor(private router: Router, private fb: FormBuilder, private jsonPacientes: PacientesService) {}

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

    this.jsonPacientes.getPacientes().subscribe(
      data=> {
        console.log(data);
        this.pacientes = data;
      }
    )

  }

  setPacientesList(): void {

    if (this.pacientes != undefined) {

      console.log('Registros '+this.pacientes.length);

      for(var cantidad = 0; cantidad<this.pacientes.length; cantidad++) {

        console.log(this.pacientes[cantidad].nombres);

        this.paciente.rut = this.pacientes[cantidad].rut;
        this.paciente.nombres = this.pacientes[cantidad].nombres;
        this.paciente.apellidos = this.pacientes[cantidad].apellidos;
        this.paciente.direccion = this.pacientes[cantidad].direccion;
        this.paciente.telefono = this.pacientes[cantidad].telefono;
        this.paciente.email = this.pacientes[cantidad].email;
        this.pacientes.push(this.paciente);

      }

    }

    console.log(this.pacientes);

  }

  submitForm(): void {
    if (!this.pacienteForm.valid) {
      alert('Revise los datos proporcionados, se han encontrado errores de validaciones.');
    } else {
      console.log('Guardando paciente.');
      this.setPaciente();
    }
  }

  setPaciente(): void {

    var rut = this.pacienteForm.get('rut')!.value;
    var nombres = this.pacienteForm.get('nombres')!.value;
    var apellidos = this.pacienteForm.get('apellidos')!.value;
    var direccion = this.pacienteForm.get('direccion')!.value;
    var telefono = this.pacienteForm.get('telefono')!.value;
    var email = this.pacienteForm.get('email')!.value;

    this.paciente.rut = rut;
    this.paciente.nombres = nombres;
    this.paciente.apellidos = apellidos;
    this.paciente.direccion = direccion;
    this.paciente.telefono = telefono;
    this.paciente.email = email;

    console.log(this.pacientes);
    this.pacientes.push(this.paciente);

    localStorage.setItem('pacientes', JSON.stringify(this.pacientes));

  }

  unsetCliente(id: number): void {

    console.log('Quitando pacientes '+id);

    this.pacientes.splice(id, 1);
    localStorage.setItem('pacientes', JSON.stringify(this.pacientes));

  } 

}

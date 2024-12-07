import { Component } from '@angular/core';
import { formatDate, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


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
  imports: [ CommonModule,ReactiveFormsModule],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})

export class PacientesComponent {

  paciente: any = {};
  pacientes: any[] = [];
  pacienteForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {}

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

    var p = localStorage.getItem('pacientes');
    console.log(p);
    if (p != undefined) {
      var list = JSON.parse(p);
      console.log(list);
      for(var i = 0; i<list.length; i++) {
        console.log(list[i].nombres);
        this.paciente.rut = list[i].rut;
        this.paciente.nombres = list[i].nombres;
        this.paciente.apellidos = list[i].apellidos;
        this.paciente.direccion = list[i].direccion;
        this.paciente.telefono = list[i].telefono;
        this.paciente.email = list[i].email;
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

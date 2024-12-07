import { Component } from '@angular/core';
import { formatDate, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


/**
 * @descripcion
 * Gestión de agenda
 * 
 * Permite concretar la reserva de horas médicas 
* 
 */

/**
 * 
 * @usageNotes
 * 
 * Selección de fecga
 * Selección de hora
 * Selección de pacientes
 * Selección de tratamientos
 *
 **/

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})

export class AgendaComponent {

  agenda: any = {};
  agendas: any[] = [];
  pacientes: any[] = [];
  tratamientos: any[] = [];
  agendaForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {

    console.log('Agendas');

    this.agendaForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      paciente: ['', Validators.required],
      tratamiento: ['', Validators.required],
    });

    var pac = localStorage.getItem('pacientes');
    if (pac != undefined) {

      var list = JSON.parse(pac);
      console.log(list);
      for(var i = 0; i<list.length; i++) {

        console.log(list[i].fecha);
        var paciente = { 'rut': list[i].rut, 'nombres': list[i].nombres, 'apellidos': list[i].apellidos, 'direccion': list[i].direccion, 'telefono': list[i].telefono, 'email': list[i].email};
        this.pacientes.push(paciente);

      }


    }

    var tra = localStorage.getItem('tratamientos');
    if (tra != undefined) {

      var list = JSON.parse(tra);
      console.log(list);
      for(var i = 0; i<list.length; i++) {

        var tratamiento = { 'nombre': list[i].nombre, 'descripcion': list[i].descripcion, 'valor': list[i].valor };
        this.tratamientos.push(tratamiento);

      }


    }

    var p = localStorage.getItem('agenda');
    console.log(p);

    if (p != undefined) {

      var list = JSON.parse(p);
      console.log(list);
      for(var i = 0; i<list.length; i++) {

        var agenda = { 'fecha': list[i].fecha, 'hora': list[i].hora, 'paciente': list[i].paciente, 'tratamiento': list[i].tratamiento };
        this.agendas.push(this.agendas);

      }

    }
    console.log(this.agendas);

  }

  submitForm(): void {
    if (!this.agendaForm.valid) {
      alert('Revise los datos proporcionados, se han encontrado errores de validaciones.');
    } else {
      console.log('Guardando agenda.');
      this.setAgenda();
    }
  }

  setAgenda(): void {

    var fecha = this.agendaForm.get('fecha')!.value;
    var hora = this.agendaForm.get('hora')!.value;
    var paciente = this.agendaForm.get('paciente')!.value;
    var tratamiento = this.agendaForm.get('tratamiento')!.value;

    this.agenda.fecha = fecha;
    this.agenda.hora = hora;
    this.agenda.paciente = paciente;
    this.agenda.tratamiento = tratamiento;

    this.agendas.push(this.agenda);

    localStorage.setItem('agenda', JSON.stringify(this.agendas));

  }

  unsetAgenda(id: number): void {

    console.log('Quitando Agendas '+id);

    this.agendas.splice(id, 1);
    localStorage.setItem('agendas', JSON.stringify(this.agendas));

  } 

}

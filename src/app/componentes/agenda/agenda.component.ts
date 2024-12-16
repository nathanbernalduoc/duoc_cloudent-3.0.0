import { Component } from '@angular/core';
import { formatDate, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgendaService } from '../../services/agenda.service';
import { HttpClientModule } from '@angular/common/http';


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
  imports: [ CommonModule,ReactiveFormsModule, HttpClientModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css',
  providers: [AgendaService]
  
})

export class AgendaComponent {

  private agendaUrl = 'https://firebasestorage.googleapis.com/v0/b/test-project-eb5c0.firebasestorage.app/o/agenda.json?alt=media&token=https://firebasestorage.googleapis.com/v0/b/test-project-eb5c0.firebasestorage.app/o/usuarios.json?alt=media&token=278c02f1-16a9-41e3-87b2-6c7dbded1516';

  agenda: any = {};
  agendas: any[] = [];
  pacientes: any[] = [];
  tratamientos: any[] = [];
  agendaForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private jsonAgenda: AgendaService) {}

  ngOnInit(): void {

    console.log('Agendas');

    this.agendaForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      paciente: ['', Validators.required],
      tratamiento: ['', Validators.required],
    });

    this.getAgenda();

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

  getAgenda(): void {

    this.jsonAgenda.getAgenda().subscribe(
      data => {
        console.log(data);
        this.agendas = data;
      }
    )
    
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

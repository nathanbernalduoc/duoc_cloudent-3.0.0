import { Component } from '@angular/core';
import { formatDate, CommonModule, getLocaleExtraDayPeriodRules } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TratamientosService } from '../../services/tratamientos.service';
import { HttpClientModule } from '@angular/common/http';

/**
 * @descripcion
 * Administración de tratamientos
 * 
 * Permite mandener tratamientos los que pueden ser utilizadns
 * en el formulario de agenda para seleccionar.
 * 
 */

/**
 * 
 * @usageNotes
 * 
 * Agregar tratamientos
 * Quitar tratamientos
 * Tratamienso almacenados en un arreglo temporal
 *
 **/


@Component({
  selector: 'app-tratamientos',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule, HttpClientModule],
  templateUrl: './tratamientos.component.html',
  styleUrl: './tratamientos.component.css',
  providers: [TratamientosService]
})

export class TratamientosComponent {

  tratamiento: any = {};
  tratamientos: any[] = [];
  tratamientoForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private jsonTratamientos: TratamientosService) {}

  ngOnInit(): void {

    console.log('Tratamientos');

    this.tratamientoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      valor: ['', Validators.required],
    });

    this.getTratamientos();

  }

  getTratamientos(): void {

    this.jsonTratamientos.getTratamientos().subscribe(
      data=> {
        console.log(data);
        this.tratamientos = data;
      }
    )

  }
  
  submitForm(): void {
    if (!this.tratamientoForm.valid) {
      alert('Revise los datos proporcionados, se han encontrado errores de validaciones.');
    } else {
      console.log('Guardando tratamiento.');
      this.setTratamiento(this.tratamiento);
    }
  }

  setTratamiento(tratamiento: any[]): void {

    var nombre = this.tratamientoForm.get('nombre')!.value;
    var descripcion = this.tratamientoForm.get('descripcion')!.value;
    var valor = this.tratamientoForm.get('valor')!.value;

    this.tratamiento.nombre = nombre;
    this.tratamiento.descripcion = descripcion;
    this.tratamiento.valor = valor;

    this.jsonTratamientos.setTratamiento(this.tratamiento).subscribe(
      data=> {
        console.log(data);
        this.tratamiento = data;
      }
    )

    this.getTratamientos();
    
  }

  unsetTratamiento(id: number): void {

    console.log('Quitando Tratamientos '+id);

    this.tratamientos.splice(id, 1);
    localStorage.setItem('Tratamientos', JSON.stringify(this.tratamientos));

  } 

}

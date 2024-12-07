import { Component } from '@angular/core';
import { formatDate, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  imports: [ CommonModule,ReactiveFormsModule],
  templateUrl: './tratamientos.component.html',
  styleUrl: './tratamientos.component.css'
})

export class TratamientosComponent {

  tratamiento: any = {};
  tratamientos: any[] = [];
  tratamientoForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {

    console.log('Tratamientos');

    this.tratamientoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      valor: ['', Validators.required],
    });

    console.log('INIT')
    var p = localStorage.getItem('tratamientos');
    console.log(p);

    if (p != undefined) {

      var list = JSON.parse(p);
      console.log(list);
      for(var i = 0; i<list.length; i++) {

        console.log(list[i].nombre);
        this.tratamiento.nombre = list[i].nombre;
        this.tratamiento.descripcion = list[i].descripcion;
        this.tratamiento.valor = list[i].valor;
        this.tratamientos.push(this.tratamiento);

      }

    }
    console.log(this.tratamientos);

  }

  submitForm(): void {
    if (!this.tratamientoForm.valid) {
      alert('Revise los datos proporcionados, se han encontrado errores de validaciones.');
    } else {
      console.log('Guardando tratamiento.');
      this.setTratamiento();
    }
  }

  setTratamiento(): void {

    console.log('Almacenando..');

    var nombre = this.tratamientoForm.get('nombre')!.value;
    var descripcion = this.tratamientoForm.get('descripcion')!.value;
    var valor = this.tratamientoForm.get('valor')!.value;

    this.tratamiento.nombre = nombre;
    this.tratamiento.descripcion = descripcion;
    this.tratamiento.valor = valor;

    console.log('Adding..');

    console.log("ANTES");
    console.log(this.tratamientos);

    this.tratamientos.push(this.tratamiento);

    console.log("DESPUES");
    console.log(this.tratamientos);

    localStorage.setItem('tratamientos', JSON.stringify(this.tratamientos));

  }

  unsetTratamiento(id: number): void {

    console.log('Quitando Tratamientos '+id);

    this.tratamientos.splice(id, 1);
    localStorage.setItem('Tratamientos', JSON.stringify(this.tratamientos));

  } 

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';


/**
 * @descripcion
 * Formulario de bienvenida
 * 
 * Aquí no se realizan operaciones, se accede
 * a las funcionalidades por medio de los menu superior
 * 
 */

/**
 * 
 * @usageNotes
 * 
* Acceso a las opciones principales del sistema.
 **/


@Component({
//  selector: 'app-main',
  selector: 'app-outlet',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent {

  title = "Cloudent";
  isResponsive: boolean = false;
  isSessionCurrent = false;

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    const isSessionCurrent = localStorage.getItem('session');
    this.isSessionCurrent = isSessionCurrent != undefined;
  }

  goSalir(): void {
    localStorage.removeItem('session');
    this.router.navigate(['login']);
  }

}

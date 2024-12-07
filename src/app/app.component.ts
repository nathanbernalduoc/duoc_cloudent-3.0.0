import { CommonModule } from '@angular/common';
import { BootstrapOptions, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

/**
 * @descripcion
 * Componente principal
 * 
 * Despliega menu y login
 * Permite recuperar contraseña detallando el email del usaurio
 * Usuario de admin por defecto: nathanbernal@gmail.com / 123.
 * Se utilzan los estlos por default de bootstrap.
 *
 */

/**
 * 
 * @usageNotes
 * 
 * Importa módulos para despliegue de vista
 * Implementa funciones para capturar la navegación 
 * Enruta a cada vista.
 */


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  title = "Cloudent";
  isSessionCurrent: boolean = false;
  isResponsive: boolean = false;
  msg: string = '';
  
  constructor(private router: Router) {
    console.log("Session  "+this.isSessionCurrent);
    if (localStorage.getItem('session')?.valueOf == undefined) {
      this.router.navigate(['login']);
    }
  }

  toggleMenu(): void {
    this.isResponsive = !this.isResponsive;
  }

  goSalir(): void {
    this.isSessionCurrent = false;
    localStorage.removeItem('session');
    this.router.navigate(['login']);
  }

  goPacientes(): void {
    this.isSessionCurrent = localStorage.getItem('session')!=undefined
    if (this.isSessionCurrent) {
      this.router.navigate(['pacientes']);
    } else {
      alert('No se ha iniciado una sesión de usuario para proceder con el módulo seleccionado.');
    }
  }

  goAgenda(): void {
    this.isSessionCurrent = localStorage.getItem('session')!=undefined
    if (this.isSessionCurrent) {
      this.router.navigate(['agenda']);
    } else {
      alert('No se ha iniciado una sesión de usuario para proceder con el módulo seleccionado.');
    }
  }

  goTratamientos(): void {
    this.isSessionCurrent = localStorage.getItem('session')!=undefined
    if (this.isSessionCurrent) {
      this.router.navigate(['tratamientos']);
    } else {
      alert('No se ha iniciado una sesión de usuario para proceder con el módulo seleccionado.');
    }
  }

  goUsuarios(): void {
    this.isSessionCurrent = localStorage.getItem('session')!=undefined
    console.log("Sesion "+this.isSessionCurrent);
    if (this.isSessionCurrent) {
      this.router.navigate(['usuarios']);
    } else {
      alert('No se ha iniciado una sesión de usuario para proceder con el módulo seleccionado.');
    }
  }

}

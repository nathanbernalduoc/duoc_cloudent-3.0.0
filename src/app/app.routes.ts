import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MainComponent } from './componentes/main/main.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { TratamientosComponent } from './componentes/tratamientos/tratamientos.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { AgendaComponent } from './componentes/agenda/agenda.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'main', component: MainComponent},
    {path: 'agenda', component: AgendaComponent},
    {path: 'pacientes', component: PacientesComponent},
    {path: 'tratamientos', component: TratamientosComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
];

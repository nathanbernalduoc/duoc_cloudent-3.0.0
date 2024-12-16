import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesComponent } from './pacientes.component';

describe('PacientesComponent', () => {
  let component: PacientesComponent;
  let fixture: ComponentFixture<PacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(2) - Validando campo nombres de paciente al agregar nuevo usuario', () => {

    component.pacienteForm.setValue(
      {
        rut: '344323423432K', // nombre a modificar para excepción
        nombres: 'Juan Fidel',
        apellidos: 'Castro',
        direccion: 'Calle larga pegada al piso 33',
        telefono: '+56 9 7890 2134',
        email: 'juanpere@email.cl',
      }
    );

    component.submitForm();
    expect(component.pacienteForm.get('nombres')?.hasError('required')).toBe(false);

  });

});

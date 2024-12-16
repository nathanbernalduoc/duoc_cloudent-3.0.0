import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientosComponent } from './tratamientos.component';

describe('TratamientosComponent', () => {
  let component: TratamientosComponent;
  let fixture: ComponentFixture<TratamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TratamientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TratamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('(6) - Validando campo descripción de nuevo tratamiento', () => {

    component.tratamientoForm.setValue(
      {
        nombre: 'Tratamiento de prueba',
        descripcion: 'Este es un tratamiento de prueba.',
        valor: 12
      }
    );

    component.submitForm();
    expect(component.tratamientoForm.get('descripcion')?.hasError('required')).toBe(false);

  });


  it('(3) - Validando campo nombre de nuevo tratamiento', () => {

    component.tratamientoForm.setValue(
      {
        nombre: 'Tratamiento de prueba', // nombre a modificar para excepción
        descripcion: 'Prueba',
        valor: '12300'
      }
    );

    component.submitForm();
    expect(component.tratamientoForm.get('nombre')?.hasError('required')).toBe(false);

  });

});

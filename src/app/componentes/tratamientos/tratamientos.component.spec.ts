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


  it('Validando campo descripción de nuevo tratamiento', () => {

    component.tratamientoForm.setValue(
      {
        nombre: 'Tratamiento de prueba',
        descripcion: null,
        valor: 12
      }
    );

    component.submitForm();
    expect(component.tratamientoForm.get('descripcion')?.hasError('required')).toBe(false);

  });


  it('Validando campo nombre de nuevo tratamiento', () => {

    component.tratamientoForm.setValue(
      {
        nombre: null, // nombre a modificar para excepción
        descripcion: 'Prueba',
        valor: '0'
      }
    );

    component.submitForm();
    expect(component.tratamientoForm.get('nombre')?.hasError('required')).toBe(false);

  });

});

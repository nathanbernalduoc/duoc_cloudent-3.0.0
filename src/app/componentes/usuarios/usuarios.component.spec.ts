import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosComponent } from './usuarios.component';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validando campo nombre de usuario al agregar nuevo usuario (Forzando error)', () => {

    component.usuarioForm.setValue(
      {
        usuario: 'juanperez@123.cl',
        contrasena: '123',
        nombre: '',
        rol: 'test'
      }
    );

    component.submitForm();
    expect(component.usuarioForm.get('nombre')?.hasError('required')).toBe(true);

  });


  it('Validando campo usuario de usuario al agregar nuevo usuario (Forzando error)', () => {

    component.usuarioForm.setValue(
      {
        usuario: 'usuariovalido@123.cl', // nombre a modificar para excepción
        contrasena: '123',
        nombre: 'Juan Perez',
        rol: 'test'
      }
    );

    component.submitForm();
    expect(component.usuarioForm.get('nombre')?.hasError('required')).toBe(true);

  });

});

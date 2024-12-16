import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(1) - Validando Login', () => {

    component.loginForm.setValue(
      {
        user: 'nathanbernal@gmail.com',
        pass: '123x123'
      }
    );

    //component.submitForm();
    expect(component.loginForm.get('user')?.hasError('required')).toBe(false);

  });

});

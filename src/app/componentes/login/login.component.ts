import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginForm! : FormGroup;
  msg:string = '';

  constructor(private fb: FormBuilder,private router:Router) {}
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required]
    });
  }

  submitLogin() {

    if (this.loginForm.valid) {

      if (this.loginForm.get('user')!.value == 'nathanbernal@gmail.com' && this.loginForm.get('pass')?.value == '123') {
        localStorage.setItem('session', JSON.stringify({ 'user': this.loginForm.get('pass')?.value }) );
        this.router.navigate(['main', {'isSessionCurrent': true}]);
      } else {
        var u = localStorage.getItem('usuarios');
        if (u != undefined) {
          var usuarioList = JSON.parse(u);
          if (usuarioList.length>0) {
            for(var i=0; i<usuarioList.length; i++) {
              if (usuarioList[i].usuario.trim() == this.loginForm.get('user')!.value.trim() && usuarioList[i].contrasena.trim() == this.loginForm.get('pass')!.value.trim()) {
                localStorage.setItem('session', JSON.stringify({ 'user': this.loginForm.get('pass')?.value }) );
                this.router.navigate(['main', {'isSessionCurrent': true}]);
              }
            }
          }
        }
        this.msg = 'Las credenciales proporcionadas son incorrectas.';
        setTimeout(() => { this.msg = ""; }, 3000);
      }

    }

  }

  getContrasena(): void {

    var user = this.loginForm.get('user')!.value;

    if (user.trim() == '') {
      alert('No es posible determinar su contraseña, se requiere su email en el campo usaurio.');
      return ;
    }

    var u = localStorage.getItem('usuarios');
    if (u != undefined) {
      var usuarioList = JSON.parse(u);
      if (usuarioList.length>0) {
        for(var i=0; i<usuarioList.length; i++) {
          if (usuarioList[i].usuario.trim() == user) {
            alert('Atención: \nSu contraseña es '+usuarioList[i].contrasena);
          }
        }
      }
    }

  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true, // ✅ Indicar que es un componente standalone
  imports: [FormsModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(public  authService: AuthService, private router: Router) {}

  login() {
    if (this.authService.login(this.username, this.password)) {
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }
}

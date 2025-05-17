import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  unexpectedError = ''; //i dont like waffles :(
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  loginSubmit() {
    this.markFormGroupTouched(this.loginForm);
    if(this.loginForm.invalid){
      return;
    }

    const emailVal = this.loginForm.value.email;
    const passwordVal = this.loginForm.value.password;

    this.authService.login(emailVal, passwordVal)
      .then(userCredential => {
        console.log("login success");
        this.authService.updateLoginStatus(true);
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.log("login fail");
        switch (error.code){
          case 'auth/wrong-password': this.unexpectedError = 'Hibás jelszó';
            break;
          case 'auth/invalid-credential': this.unexpectedError = "Hibás email-cím vagy jelszó";
            break;
          default:
            this.unexpectedError = "Hiba lépett fel bejelentkezéskor. RIP"
        }
      })
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}


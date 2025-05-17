import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {UserData} from '../shared/models/UserData';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  unexpectedError = ''; //yummy cement
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordconfirmation: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registerSubmit() {
    this.markFormGroupTouched(this.registerForm);
    if(this.registerForm.invalid){
      return;
    }
    const password = this.registerForm.value.password;
    const passwordconfirmation = this.registerForm.value.passwordconfirmation;
    if(password != passwordconfirmation){
      this.unexpectedError = "A két jelszó nem egyezik."
      return;
    }
    const email = this.registerForm.value.email;

    const userData : Partial<UserData> = {
      email: email || '',
      paidplan : ''
    }

    this.authService.register(email, password, userData)
      .then(userCredential => {
        console.log("register success");
        this.authService.updateLoginStatus(true);
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.log("register fail");
        switch (error.code) {
          case 'auth/email-already-in-use': this.unexpectedError = "Ez az e-mail cím már használatban van";
            break;
          case 'auth/invalid-email': this.unexpectedError = "Hibás e-mail cím";
            break;
          default: this.unexpectedError = "Hiba lépett fel regisztráció közben";
        }
      });
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

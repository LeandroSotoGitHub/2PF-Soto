import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { generateToken } from 'src/app/shared/utils';
import { FormValidatorHelper } from 'src/app/shared/utils/form-validator.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private authService: AuthService
  ){
    this.registerForm = fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['user',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required]
    })
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
    } else {
      const formData = {
        ...this.registerForm.value,
        token: generateToken(20)
      }
      this.authService.register(formData).subscribe({
        next: (user) => {
          console.log('Registro exitoso con token:', user)
          this.router.navigate(['/auth/login'])
        },
        error: (err) => {
          console.error(err)
          if (err instanceof Error) {
            alert(err.message)
          }
        }
      })
    }
  }

  getErrorMessage(controlName: string): string{
    return FormValidatorHelper.getErrorMessage(this.registerForm, controlName);
  }

  hasError(controlName: string): boolean {
    return FormValidatorHelper.hasError(this.registerForm, controlName);
  }

  toLogin(){
    this.router.navigate(['/auth/login'])
  }
}

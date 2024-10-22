import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidatorService } from 'src/app/core/services/form-validator.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup
  passwordInputType: 'password' | 'text' = 'password'

  constructor(
    private router:Router,
    private fb:FormBuilder,
    private formValidatorService: FormValidatorService,
    private authService:AuthService
  ){this.loginForm = fb.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  }) } 

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['dashboard', 'home']);
        },
        error: (err) => {
          console.error(err);
          if (err instanceof Error) {
            alert(err.message);
          }
        },
      });
    }
  }

  toggleInputType(): void{
    if (this.passwordInputType === 'password'){
      this.passwordInputType = 'text'
    }else{
      this.passwordInputType = 'password'
    }
  }

  getErrorMessage(controlName: string): string{
    return this.formValidatorService.getErrorMessage(this.loginForm, controlName)
  }

  hasError(controlName: string): boolean {
    return this.formValidatorService.hasError(this.loginForm, controlName);
  }

  toRegister(){
    this.router.navigate([['/register']])
  }
}

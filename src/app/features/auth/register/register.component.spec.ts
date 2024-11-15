import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterComponent } from './register.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { of, throwError } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockAuthService {
  register = jasmine.createSpy('register').and.returnValue(of({}));
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: MockAuthService;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockAuthService = new MockAuthService();
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        FormBuilder
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('debería crear un formulario de registro', () => {
    expect(component.registerForm).toBeTruthy()
    expect(component.registerForm.contains('email')).toBeTruthy()
    expect(component.registerForm.contains('password')).toBeTruthy()
    expect(component.registerForm.contains('firstName')).toBeTruthy()
    expect(component.registerForm.contains('lastName')).toBeTruthy()
  });

  it('debería requerir email, password, firstName y lastName', () => {
    const email = component.registerForm.get('email')
    const password = component.registerForm.get('password')
    const firstName = component.registerForm.get('firstName')
    const lastName = component.registerForm.get('lastName')

    email?.setValue('')
    password?.setValue('')
    firstName?.setValue('')
    lastName?.setValue('')

    expect(email?.valid).toBeFalsy()
    expect(password?.valid).toBeFalsy()
    expect(firstName?.valid).toBeFalsy()
    expect(lastName?.valid).toBeFalsy()
  })

  it('deberia llamar a onSubmit y ir al login', () => {
    component.registerForm.setValue({
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
      firstName: 'John',
      lastName: 'Doe'
    })

    mockAuthService.register.and.returnValue(of({}))

    component.onSubmit();

    expect(mockAuthService.register).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login'])
  });

  it('deberia navegar al login cuando se llame a toLogin', () => {
    component.toLogin()

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login'])
  })
})
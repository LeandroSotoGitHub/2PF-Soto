import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import { AuthActions } from 'src/app/store/actions/auth.actions';
import { environment } from 'src/environments/environment.development';
import { User } from 'src/app/features/dashboard/models';
import { AuthData } from 'src/app/features/auth/models';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockStore: jasmine.SpyObj<Store>;

  const mockUser: User = {
    id: '1',
    firstName:'test',
    lastName:'test',
    email: 'test@example.com',
    password: 'password123',
    token: 'valid-token',
  };

  const baseUrl = environment.apiBaseUrl;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: mockRouter },
        { provide: Store, useValue: mockStore },
      ],
    })

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    httpMock.verify();
  })

  it('deberia crearse correctamente', () => {
    expect(service).toBeTruthy();
  })

  describe('#login', () => {
    it('deberia iniciar sesión y almacenar el token', (done) => {
      const authData: AuthData = { email: mockUser.email, password: mockUser.password }

      service.login(authData).subscribe((user) => {
        expect(user).toEqual(mockUser);
        expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.setAuthenticatedUser({ user: mockUser }))
        expect(localStorage.getItem('token')).toBe(mockUser.token)
        done()
      })

      const req = httpMock.expectOne(`${baseUrl}/users?email=${authData.email}&password=${authData.password}`)
      expect(req.request.method).toBe('GET')
      req.flush([mockUser])
    });

    it('deberia lanzar un error si las credenciales son inválidas', (done) => {
      const authData: AuthData = { email: 'invalid@example.com', password: 'wrongpassword' }

      service.login(authData).subscribe({
        error: (err) => {
          expect(err.message).toBe('Los datos son inválidos')
          done();
        },
      });

      const req = httpMock.expectOne(`${baseUrl}/users?email=${authData.email}&password=${authData.password}`)
      expect(req.request.method).toBe('GET')
      req.flush([], { status: 401, statusText: 'Unauthorized' })
    });
  });

  describe('#verifyToken', () => {
    it('deberia devolver true si el token es válido', (done) => {
      localStorage.setItem('token', mockUser.token)

      service.verifyToken().subscribe((isValid) => {
        expect(isValid).toBeTrue()
        expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.setAuthenticatedUser({ user: mockUser }))
        done();
      });

      const req = httpMock.expectOne(`${baseUrl}/users?token=${mockUser.token}`)
      expect(req.request.method).toBe('GET');
      req.flush([mockUser]);
    });

    it('deberia devolver false si el token es inválido', (done) => {
      localStorage.setItem('token', 'invalid-token');

      service.verifyToken().subscribe((isValid) => {
        expect(isValid).toBeFalse()
        done();
      });

      const req = httpMock.expectOne(`${baseUrl}/users?token=invalid-token`)
      expect(req.request.method).toBe('GET')
      req.flush([], { status: 401, statusText: 'Unauthorized' })
    });
  });

  describe('#logout', () => {
    it('deberia eliminar el token y redirigir al login', () => {
      localStorage.setItem('token', mockUser.token)

      service.logout();

      expect(localStorage.getItem('token')).toBeNull()
      expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.unsetAuthenticatedUser())
      expect(mockRouter.navigate).toHaveBeenCalledWith(['auth', 'login'])
    });
  });

  describe('#register', () => {
    it('deberia registrar un nuevo usuario', (done) => {
      service.register(mockUser).subscribe((user) => {
        expect(user).toEqual(mockUser);
        done();
      });

      const req = httpMock.expectOne(`${baseUrl}/users`)
      expect(req.request.method).toBe('POST')
      req.flush(mockUser);
    });

    it('deberia lanzar un error si el registro falla', (done) => {
      service.register(mockUser).subscribe({
        error: (err) => {
          expect(err.message).toBe('Error en el registro del usuario');
          done()
        },
      });

      const req = httpMock.expectOne(`${baseUrl}/users`)
      expect(req.request.method).toBe('POST')
      req.flush({}, { status: 400, statusText: 'Bad Request' })
    });
  });
});

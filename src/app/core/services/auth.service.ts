import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AuthData } from 'src/app/features/auth/models';
import { User } from 'src/app/features/dashboard/models';
import { generateUniqueId } from 'src/app/shared/utils';

const FAKE_USER: User = {
  email: 'admin@mail.com',
  firstName: 'admin',
  lastName: 'admin',
  id: generateUniqueId(),
  createdAt: new Date(),
  password: '123456',
  token:'abcsdfhsdjkfbh21231nklsnvsajkqw12132123',
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _authUser$ = new BehaviorSubject<null | User>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(private router: Router) {}

  login(data: AuthData): Observable<User> {
    if (data.email != FAKE_USER.email || data.password != FAKE_USER.password) {
      return throwError(() => new Error('Los datos son invalidos'))
    }
    this._authUser$.next(FAKE_USER)
    localStorage.setItem('token', FAKE_USER.token)
    return of(FAKE_USER)
  }
  verifyToken(): Observable<boolean>{
    const isValid = localStorage.getItem('token') === FAKE_USER.token
    
    if(isValid){
      this._authUser$.next(FAKE_USER)
    }else{
      this._authUser$.next(null)
    }
    return of(isValid)
  }
  logout() {
    this._authUser$.next(null);
    this.router.navigate(['auth', 'login'])
    localStorage.removeItem('token')
  }
}

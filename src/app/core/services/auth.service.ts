import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthData } from 'src/app/features/auth/models';
import { User } from 'src/app/features/dashboard/models';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _authUser$ = new BehaviorSubject<null | User>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(
    private router: Router, 
    private httpClient: HttpClient
  ) {}

  private handleAuth(u:User[]): User | null{
    if(!!u[0]){
      this._authUser$.next(u[0])
      localStorage.setItem('token', u[0].token)
      return u[0]
    }else{
      return null
    }
  }

  login(data: AuthData): Observable<User> {
    return this.httpClient.get<User[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`)
    .pipe(map((u) => {
      const user = this.handleAuth(u)
      if(user){
        return user
      }else{
        throw throwError(() => new Error('Los datos son invalidos'))
      }
    }),
    catchError((err) =>{
      return throwError(() => new Error('Los datos son invalidos'))
    })
  )
  }
  verifyToken(): Observable<boolean>{
    return this.httpClient.get<User[]>(`http://localhost:3000/users?token=${localStorage.getItem('token')}`)
    .pipe(map((u) => {
      const user = this.handleAuth(u)
      return !!user
    }))
  }
  logout() {
    this._authUser$.next(null);
    this.router.navigate(['auth', 'login'])
    localStorage.removeItem('token')
  }
}

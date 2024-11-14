import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthData } from 'src/app/features/auth/models';
import { User } from 'src/app/features/dashboard/models';
import { AuthActions } from 'src/app/store/actions/auth.actions';
import { selectAuthenticatedUser } from 'src/app/store/selectors/auth.selectors';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public authUser$: Observable< User | null>
  private baseUrl = environment.apiBaseUrl


  constructor(
    private router: Router, 
    private httpClient: HttpClient,
    private store: Store
  ) {
      this.authUser$ = this.store.select(selectAuthenticatedUser)
  }

  private handleAuth(u:User[]): User | null{
    if(!!u[0]){
      this.store.dispatch(AuthActions.setAuthenticatedUser({user: u[0]}))
      localStorage.setItem('token', u[0].token)
      return u[0]
    }else{
      return null
    }
  }

  login(data: AuthData): Observable<User> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/users?email=${data.email}&password=${data.password}`)
      .pipe(
        map((u) => {
          const user = this.handleAuth(u);
          if (user) {
            return user;
          } else {
            throw throwError(() => new Error('Los datos son inválidos'));
          }
        }),
        catchError((err) => {
          return throwError(() => new Error('Los datos son inválidos'));
        })
      );
  }
  
  verifyToken(): Observable<boolean> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/users?token=${localStorage.getItem('token')}`)
      .pipe(
        map((u) => {
          const user = this.handleAuth(u);
          return !!user;
        }),
        catchError(() => of(false))
      );
  }


  logout(): void {
    this.store.dispatch(AuthActions.unsetAuthenticatedUser());
    this.router.navigate(['auth', 'login']);
    localStorage.removeItem('token');
  }
  
  register(data: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/users`, data).pipe(
      map((user) => {
        if (user) {
          return user;
        } else {
          throw throwError(() => new Error('No se pudo registrar el usuario'));
        }
      }),
      catchError((err) => {
        return throwError(() => new Error('Error en el registro del usuario'));
      })
    );
  }

}
 
import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of, tap, throwError} from "rxjs";
import {environments} from "../../../../environments/environments";
import {AuthStatus, LoginStatusResponse} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = environments.testBaseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<Response| LoginStatusResponse | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);


  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  login(email: string, password: string): Observable<Boolean>{
    const url = `${ this.baseUrl }/auth/login`;
    const body = { email, password };

    return this.http.post<LoginStatusResponse>(url, body)
      .pipe(
        tap( (res) => {
          if (!res.roles.includes('admin')) {
            throw new Error();
          }

          this._currentUser.set( res );
          this._authStatus.set( AuthStatus.authenticated );
          localStorage.setItem( 'token', res.token );
        }),

        map( () => true ),

        catchError(err => {
          console.log(err)
          return throwError( () => err.error.message);
        })
      )
  };

  checkAuthStatus(): Observable<Boolean> {
    const url = `${ this.baseUrl }/auth/check-status`;
    const token = localStorage.getItem('token');
    //console.log(token);

    if(!token){
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<LoginStatusResponse>(url, { headers })
      .pipe(
        map( (res) => {
          this._currentUser.set( res );
          this._authStatus.set( AuthStatus.authenticated );
          localStorage.setItem( 'token', res.token );
          return true;
        }),

        catchError( () => {
          this._authStatus.set(AuthStatus.notAuthenticated)
          this.logout();
          return of(false);
        })
      )
  }

  logout(){
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );
  }
}

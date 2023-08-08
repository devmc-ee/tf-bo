import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string | null = null;

  constructor() {}

  loginStatus(): Observable<boolean> {
    return of(this.isLoggedIn)
  }

  login(): Observable<boolean> {
    console.log('login')
    return of(true).pipe(
      delay(100),
      tap(() => {
        this.isLoggedIn = true
        this.loginStatus()
      }),
      
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}

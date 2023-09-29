import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TfApiProvider } from 'src/providers/tf-api/tf-api.provider';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string | null = null;
  accessToken = '';

  constructor(
    public authService: SocialAuthService, 
    private router: Router, 
    private api: TfApiProvider,
    private snackBar: MatSnackBar,
  ) {
    this.accessToken = this.getToken();
    this.isLoggedIn = !!this.accessToken;
  }

  getToken() {
    return localStorage.getItem('tf_bo_at') || '';
  }

  authorize() {
    this.authService.authState.subscribe({
      next: (user) => {
        // api auth request
        if (user?.idToken) {
          this.api.isAuth(user.idToken).subscribe({
            next: ({ user, accessToken }) => {
              // TODO: add storage
              localStorage.setItem('tf_bo_at', accessToken);
              this.isLoggedIn = true;
              this.router.navigate(['/']);
            },
            error: (error) => {
              console.log({error})
              this.isLoggedIn = false;
              this.snackBar.open(error?.error?.message || error?.statusText || 'something wrong', 'X', {
                verticalPosition: 'top'
              });
            },
          })
        }
      },
      error: (error) => {
        this.isLoggedIn = false;
        this.snackBar.open(error?.error?.message || error?.statusText || 'something went wrong', 'X', {
          verticalPosition: 'top'
        });
      }
    })
  }

  logout(): void {
    localStorage.removeItem('tf_bo_at');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}

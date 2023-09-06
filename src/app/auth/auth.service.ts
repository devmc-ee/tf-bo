import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TfApiProvider } from 'src/providers/tf-api/tf-api.provider';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string | null = null;
  accessToken = '';

  constructor(public authService: SocialAuthService, private router: Router, private api: TfApiProvider) {
    this.accessToken = localStorage.getItem('tf_bo_at') || '';
    this.isLoggedIn = !!this.accessToken;
  }

  initAuth() {
    return this.api.getCsrf();
  }


  subscribeAuthState() {
    this.authService.authState.subscribe((user) => {
      console.log('cookie', document.cookie)
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
          },
        })
      }
    })
  }

  logout(): void {
    localStorage.removeItem('tf_bo_at');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}

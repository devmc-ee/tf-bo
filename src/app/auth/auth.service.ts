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

  constructor(public authService: SocialAuthService, private router: Router, private api: TfApiProvider) {}

  initAuth() {
    return this.api.getCsrf();
  }
  subscribeAuthState() {
    this.authService.authState.subscribe((user) => {
      // api auth request

      if (user?.idToken) {
        this.api.isAuth(user.idToken).subscribe(
          (response) => {
            console.log({response})
            this.isLoggedIn = true;
            this.router.navigate(['/']);
          },
          (error) => {
            console.log({error})
            this.isLoggedIn = false;
          },
        )
      }
    })
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}

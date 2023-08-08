import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoggedIn: boolean = false;

  constructor(public authService: AuthService, public router: Router) {
  }

  login() {
    this.authService.login().subscribe((isLoggedIn) => {
      if (this.authService.isLoggedIn) {
        // Usually you would use the redirect URL from the auth service.
        // However to keep the example simple, we will always redirect to `/admin`.
        const redirectUrl = '/';

        // Redirect the user
        this.router.navigate([redirectUrl]);
      }
    });
  }
}

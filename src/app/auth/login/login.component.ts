import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {
  }
  async ngOnInit() {
    this.authService.initAuth().subscribe((value) => {
      this.authService.subscribeAuthState()
    });
  }
}

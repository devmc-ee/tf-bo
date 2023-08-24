import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AuthComponent } from './auth.component';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HTTP_INTERCEPTORS,  } from '@angular/common/http';
import { AuthCsfrInterceptor } from './auth-csfr.interceptor';

@NgModule({
  declarations: [LoginComponent, AuthComponent],
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, GoogleSigninButtonModule],
  exports: [LoginComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthCsfrInterceptor,
      multi: true,
    },
  ]
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { MenuGroupsComponent } from './menu-groups/menu-groups.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthModule } from './auth/auth.module';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MenuItemsComponent,
    MenuGroupsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ToolbarComponent,
    AuthModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId)
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

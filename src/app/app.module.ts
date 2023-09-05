import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { MenuGroupsComponent } from './menu-groups/menu-groups.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthModule } from './auth/auth.module';
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

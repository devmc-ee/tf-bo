import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { WorkingTimeComponent } from './working-time/working-time.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path: '',
    title: 'Menu',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        title: 'Menu',
        component: MenuComponent,
      },
      {
        path: 'working-time',
        title: 'Working Time',
        component: WorkingTimeComponent,
      },
    ],
  },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // TODO: add env check
      // enableTracing: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

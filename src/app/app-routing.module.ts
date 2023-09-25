import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuGroupsComponent } from './menu-groups/menu-groups.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
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
        path: 'menu-groups',
        title: 'Menu Groups',
        component: MenuGroupsComponent,
      },
      {
        path: 'menu-items',
        title: 'Menu Items',
        component: MenuItemsComponent,
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

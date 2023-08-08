import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuGroupsComponent } from './menu-groups/menu-groups.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
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
    ],
  },
  { path: 'login', title: 'Login', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // TODO: add env check
      enableTracing: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

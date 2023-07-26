import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuGroupsComponent } from './menu-groups/menu-groups.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';

const routes: Routes = [
    { path: 'menu-groups', component: MenuGroupsComponent },
  { path: 'menu-items', component: MenuItemsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

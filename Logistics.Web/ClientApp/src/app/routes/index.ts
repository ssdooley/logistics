import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminItemCategoriesComponent } from './admin/item-categories/admin-item-categories.component';
import { AdminManufacturersComponent } from './admin/manufacturers/admin-manufacturers.component';
import { AdminPrioritiesComponent } from './admin/priorities/admin-priorities.component';
import { AdminSitesComponent } from './admin/sites/admin-sites.component';
import { AdminUsersComponent } from './admin/users/admin-users.component';
import { AdminVendorsComponent } from './admin/vendors/admin-vendors.component';

export const RouteComponents = [
  HomeComponent,
  AdminComponent,
  AdminItemCategoriesComponent,
  AdminManufacturersComponent,
  AdminPrioritiesComponent,
  AdminSitesComponent,
  AdminUsersComponent,
  AdminVendorsComponent
];

export const Routes: Route[] = [
  { path: 'home', component: HomeComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: AdminUsersComponent },
      { path: 'sites', component: AdminSitesComponent },
      { path: 'priorities', component: AdminPrioritiesComponent },
      { path: 'item-categories', component: AdminItemCategoriesComponent },
      { path: 'manufacturers', component: AdminManufacturersComponent },
      { path: 'vendors', component: AdminVendorsComponent },
      { path: '**', redirectTo: 'users', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

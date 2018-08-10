import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';

import { MaterialModule } from './material.module';
import { ServicesModule } from './services.module';

import { SidepanelComponent } from './components/sidepanel/sidepanel.component';
import { PanelLinkComponent } from './components/sidepanel/panel-link.component';
import { ThemePreviewComponent } from './components/theme/theme-preview.component';

import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { ThemePickerComponent } from './routes/theme-picker/theme-picker.component';

import { AdminComponent } from './routes/admin/admin.component';
import { AdminUsersComponent } from './routes/admin/users/admin-users.component';
import { AdminSitesComponent } from './routes/admin/sites/admin-sites.component';
import { AdminPrioritiesComponent } from './routes/admin/priorities/admin-priorities.component';
import { AdminItemCategoriesComponent } from './routes/admin/item-categories/admin-item-categories.component';
import { AdminManufacturersComponent } from './routes/admin/manufacturers/admin-manufacturers.component';
import { AdminVendorsComponent } from './routes/admin/vendors/admin-vendors.component';

const routes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', component: AdminUsersComponent },
    { path: 'sites', component: AdminSitesComponent },
    { path: 'priorities', component: AdminPrioritiesComponent },
    { path: 'item-categories', component: AdminItemCategoriesComponent },
    { path: 'manufacturers', component: AdminManufacturersComponent },
    { path: 'vendors', component: AdminVendorsComponent }
  ]},
  { path: 'theme-picker', component: ThemePickerComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    SidepanelComponent,
    PanelLinkComponent,
    ThemePreviewComponent,
    AppComponent,
    HomeComponent,
    ThemePickerComponent,
    AdminComponent,
    AdminUsersComponent,
    AdminSitesComponent,
    AdminPrioritiesComponent,
    AdminItemCategoriesComponent,
    AdminManufacturersComponent,
    AdminVendorsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ServicesModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ApiDataComponent } from './pages/api-data/api-data';
import { FormPageComponent } from './pages/form-page/form-page';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'api-data', component: ApiDataComponent },
  { path: 'form-page', component: FormPageComponent },
  { path: '**', redirectTo: '/home' }
];
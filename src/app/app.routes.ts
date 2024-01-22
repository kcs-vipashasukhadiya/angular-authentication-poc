import { Routes } from '@angular/router';
import { authGuard } from './authentication/auth-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent) },
  { path: 'register', loadComponent: () => import('./registration/registration.component').then(c => c.RegistrationComponent) },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent), canActivate: [authGuard] }
];

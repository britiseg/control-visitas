import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/auth.guard';
import { guestGuard } from './core/guest.guard';

export const routes: Routes = [
  // si entras a raíz, vas a dashboard PERO protegido
  { path: '', canActivate: [authGuard], component: DashboardComponent },

  // login solo accesible si NO estás logueado
  { path: 'login', canActivate: [guestGuard], component: LoginComponent },

  // cualquier otra ruta te manda a raíz (y authGuard decide)
  { path: '**', redirectTo: '' },
];

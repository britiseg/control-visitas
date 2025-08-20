import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);
  return auth.isLoggedIn() ? router.createUrlTree(['/']) : true;
};

// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';

// export const guestGuard: CanActivateFn = () => {
//   const router = inject(Router);
//   const token = localStorage.getItem('token');
//   if (token) {
//     router.navigateByUrl('/');
//     return false;
//   }
//   return true;
// };

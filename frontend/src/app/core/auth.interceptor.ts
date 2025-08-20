import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const auth = inject(AuthService);

  // Solo leer localStorage en navegador
  const token = isPlatformBrowser(platformId) ? auth.token : null;

  const apiBase = environment.apiUrl;
  const isApiReq =
    req.url.startsWith(apiBase) || (req.url.startsWith('/') && !!apiBase);

  if (token && isApiReq) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req);
};

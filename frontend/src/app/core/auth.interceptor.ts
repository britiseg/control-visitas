// src/app/core/auth.interceptor.ts
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

  // Normaliza la URL absoluta de la API
  // (si usas rutas relativas en tus servicios, conviértelas a absolutas)
  const apiBase = environment.apiUrl; // 👈 asegúrate que existe en environment.ts
  const isApiReq =
    req.url.startsWith(apiBase) ||
    // Si estás usando rutas relativas tipo "/auth/login", únelas a apiBase para comparar
    (req.url.startsWith('/') && !!apiBase);

  if (token && isApiReq) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req);
};

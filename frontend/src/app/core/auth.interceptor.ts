import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Inyectamos el token de la plataforma
  const platformId = inject(PLATFORM_ID);

  let token: string | null = null;

  // Verificamos si estamos en el navegador antes de acceder a localStorage
  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token');
  }

  // Si se encuentra un token, se clona la solicitud con el encabezado de autorización
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};

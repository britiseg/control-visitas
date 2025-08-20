import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

type LoginResp = {
  access_token: string;
  user: { id: number; name: string; email: string; role?: string | null };
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly key = 'cv_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<LoginResp>(
        `${environment.apiUrl}/auth/login`,
        { email, password },
        {
          // Si manejas sesión por cookie, descomenta:
          // withCredentials: true,
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .pipe(
        tap((res) => {
          if (res?.access_token) this.saveToken(res.access_token);
        })
      );
  }

  saveToken(token: string) {
    localStorage.setItem(this.key, token);
  }

  get token(): string | null {
    return localStorage.getItem(this.key);
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  logout() {
    localStorage.removeItem(this.key);
    this.router.navigateByUrl('/login');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

type LoginResp = {
  access_token: string;
  user: { id: number; name: string; email: string; role?: string | null };
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly key = 'cv_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<LoginResp>(`${environment.apiUrl}/auth/login`, {
      email,
      password,
    });
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

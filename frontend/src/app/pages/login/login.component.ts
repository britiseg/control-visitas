import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // 👈 plural
})
export class LoginComponent {
  email = 'admin@example.com';
  password = '123456';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.loading = true;
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        this.auth.saveToken(res.access_token);
        this.router.navigateByUrl('/'); // irá a dashboard (protegido por guard)
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Error de autenticación';
        this.loading = false;
      },
    });
  }
}

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
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = 'admin@example.com';
  password = '123456';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  // ...
  submit() {
    this.loading = true;
    this.error = '';

    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('[login] respuesta', res);
        this.auth.saveToken(res.access_token);
        console.log('[login] token guardado?', this.auth.token);

        // navega al dashboard
        this.router.navigateByUrl('/').then((ok) => {
          if (!ok) {
            console.warn('[login] navigateByUrl falló; usando fallback');
            window.location.assign('/'); // fallback duro
          }
        });
      },
      error: (err) => {
        console.error('[login] error', err);
        this.error = err?.error?.message ?? 'Credenciales inválidas';
        this.loading = false;
      },
    });
  }
}

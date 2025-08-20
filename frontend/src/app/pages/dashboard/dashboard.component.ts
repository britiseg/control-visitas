import { Component, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding:24px;">
      <div
        style="display:flex;justify-content:space-between;align-items:center;"
      >
        <h2>Dashboard</h2>
        <button class="btn btn-outline" (click)="logout()">Salir</button>
      </div>
      <button class="btn btn-secondary" (click)="load()">Refrescar</button>
      <pre *ngIf="data" style="margin-top:16px;">{{ data | json }}</pre>
    </div>
  `,
})
export class DashboardComponent {
  data: any;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) this.load();
  }

  load() {
    this.http
      .get(`${environment.apiUrl}/db/tables`)
      .subscribe((res) => (this.data = res));
  }

  logout() {
    this.auth.logout(); // limpia token y redirige a /login
  }
}

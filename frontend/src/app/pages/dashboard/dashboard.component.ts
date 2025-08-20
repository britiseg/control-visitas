import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container" style="padding:24px;">
      <h2>Dashboard</h2>
      <button class="btn btn-secondary" (click)="load()">Refrescar</button>
      <pre *ngIf="data" style="margin-top:16px;">{{ data | json }}</pre>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  data: any;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.http
      .get(`${environment.apiUrl}/db/tables`)
      .subscribe((res) => (this.data = res));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'; // ajusta la ruta si usas el estándar

@Injectable({ providedIn: 'root' })
export class HealthService {
  constructor(private http: HttpClient) {}
  ping() {
    return this.http.get(`${environment.apiUrl}/`);
  }
}

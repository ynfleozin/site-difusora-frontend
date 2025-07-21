import {
  Injectable,
  inject,
  signal,
  WritableSignal,
  PLATFORM_ID,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api/auth';
  private http = inject(HttpClient);
  private router = inject(Router);

  private platformId = inject(PLATFORM_ID);

  public isAuthenticated: WritableSignal<boolean> = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.isAuthenticated.set(true);
      }
    }
  }

  login(user: string, pass: string): Observable<boolean> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, {
        username: user,
        password: pass,
      })
      .pipe(
        tap((response) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('authToken', response.token);
            this.isAuthenticated.set(true);
          }
        }),
        map(() => true),
        catchError(() => of(false))
      );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      this.isAuthenticated.set(false);
      this.router.navigate(['/']);
    }
  }
}

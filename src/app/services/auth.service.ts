import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment-development';

interface DecodedToken {
  exp: number;
  iat: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private http = inject(HttpClient);

  constructor() {}

  login(username: string, password: string): Observable<{ token: string }> {
    const loginUrl = `${environment.apiUrl}/auth/login`;
    return this.http
      .post<{ token: string }>(loginUrl, { username, password })
      .pipe(
        tap((response) => {
          this.saveToken(response.token);
        })
      );
  }

  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
    }
  }

  isAuthenticated(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const token = this.getToken();

    if (!token) {
      console.log('AuthService: Nenhum token encontrado.');
      return false;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        console.warn('AuthService: Token JWT expirado. Removendo token.');
        this.removeToken();
        return false;
      }

      console.log('AuthService: Token válido.');
      return true;
    } catch (error) {
      console.error(
        'AuthService: Erro ao decodificar token JWT. Removendo token.',
        error
      );
      this.removeToken();
      return false;
    }
  }
}

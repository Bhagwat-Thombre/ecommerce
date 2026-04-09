import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  register(name: string, email: string, password: string) {
    return this.http.post<{ message: string }>(
      environment.apiUrl + '/auth/register',
      { name, email, password },
    );
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string; user: any }>(
      environment.apiUrl + '/auth/login',
      { email, password },
    );
  }

  get isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  get isAdmin() {
    const userData = localStorage.getItem('user');
    if (!userData) return false;

    try {
      return JSON.parse(userData).isAdmin || false;
    } catch {
      return false;
    }
  }

  get userName() {
    const userData = localStorage.getItem('user');
    if (!userData) return null;

    try {
      return JSON.parse(userData).name;
    } catch {
      return null;
    }
  }

  get userEmail() {
    const userData = localStorage.getItem('user');
    if (!userData) return null;

    try {
      return JSON.parse(userData).email;
    } catch {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

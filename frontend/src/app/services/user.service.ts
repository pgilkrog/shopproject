import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({ providedIn: 'root' })

export class UserService {
  BACKEND_URL = environment.apiUrl + 'user';
  token = '';
  userId = '';
  role = '';

  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  getRole(): string {
    return this.role;
  }

  createUser(user: User): void {
    this.http.post<{token: string, id: string, role: string}>(this.BACKEND_URL, user).subscribe(responseData => {
      this.token = responseData.token;
      this.userId = responseData.id;
      this.role = responseData.role;

      if (this.token) {
        this.saveAuthData();
      }
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  signin(user: User): void {
    this.http.post<{token: string, id: string, role: string}>(this.BACKEND_URL + '/auth/', user)
    .subscribe(responseData => {
      this.token = responseData.token;
      this.userId =  responseData.id;
      this.role = responseData.role;
      this.authStatusListener.next(true);
      this.isAuthenticated = true;

      if (this.token) {
        this.saveAuthData();
      }
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  signout(): void {
    this.authStatusListener.next(false);
    this.isAuthenticated = false;
    this.removeAuthData();
  }

  getUserById(): any {
    return this.http.get<{ user: User }>(this.BACKEND_URL + '/' + this.userId);
  }

  getToken(): string {
    return this.token;
  }

  autoAuthUser(): void {
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }

    this.token = authInformation.token;
    this.userId = authInformation.userId;
    this.role = authInformation.userRole;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  private saveAuthData(): void {
    localStorage.setItem('token', this.token);
    localStorage.setItem('userId', this.userId);
    localStorage.setItem('userRole', this.role);
    this.router.navigate(['/']);
  }

  private removeAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    this.router.navigate(['/']);
  }

  private getAuthData(): any {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');

    if (!token || !userId) {
      return;
    }

    return {
      token,
      userId,
      userRole
    };
  }
}

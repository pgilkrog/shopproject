import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({ providedIn: 'root' })

export class UserService {
  BACKEND_URL = environment.apiUrl + 'user';
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;

  token = '';
  userId = '';
  role = '';

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

  checkUserByEmail(email: string): any {
    return this.http.get<{ msg: boolean }>(this.BACKEND_URL + '/getByEmail/' + email);
  }

  resetPassword(Upassword: string, Uemail: string): void {
    // make object with given information, and send it to backend
    const resetData = { password: Upassword, email: Uemail };
    this.http.post<{ msg: string }>(this.BACKEND_URL + '/resetPassword/', resetData).subscribe(resData => {
      console.log(resData);
    });
  }

  createUser(user: User): void {
    // creates the user, and response with an id, token, userRole
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
    this.http.post<{token: string, id: string, role: string}>(this.BACKEND_URL + '/auth/', user).subscribe(responseData => {
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
      console.log(error)
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

  getUserId(): string {
    return this.userId;
  }

  getToken(): string {
    return this.token;
  }

  autoAuthUser(): void {
    // get information from localstorage
    const authInformation = this.getAuthData();

    if (!authInformation) {
      // if no information is found return
      return;
    }

    this.token = authInformation.token;
    this.userId = authInformation.userId;
    this.role = authInformation.userRole;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);

    // refresh the token with a userId
    const data = { id: this.userId };
    this.http.post(this.BACKEND_URL + '/refreshToken/', data).subscribe({
      next: (tokenData: any) => {
        this.token = tokenData.token;
        localStorage.setItem('token', tokenData.token);
        console.log('hvor tit kører jeg refreshToken?');
      },
      error: err => console.log('[autoauth error]', err)
    });
  }

  private saveAuthData(): void {
    // saves information in localStorage
    localStorage.setItem('token', this.token);
    localStorage.setItem('userId', this.userId);
    localStorage.setItem('userRole', this.role);
    this.router.navigate(['/']);
  }

  private removeAuthData(): void {
    // removes information from localstorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    this.router.navigate(['/']);
  }

  private getAuthData(): any {
    // read information from localstorage and puts them into variables.
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    if (!token && !userId) {
      return;
    }

    return {
      token,
      userId,
      userRole
    };
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = new BehaviorSubject<UserInterface | null>(this.getCurrentUser());

  constructor(
    private http: HttpClient
  ) {

  }

  setCurrentUser(user: UserInterface) {
    localStorage.setItem('currentUser', JSON.stringify(user));

    this.currentUser$.next(user);
  }

  removeCurrentUser() {
    localStorage.removeItem('currentUser');

    this.currentUser$.next(null);
  }

  getCurrentUser(): UserInterface | null {
    const userInStorage: string | null = localStorage.getItem('currentUser');

    if (userInStorage) {
      return JSON.parse(userInStorage);
    }

    return null;
  }

  signup(authData: UserInterface) {
    return this.http.post(`${environment.backendUrl}/auth/signup`, authData, {
      withCredentials: true
    });
  }

  login(authData: UserInterface) {
    return this.http.post(`${environment.backendUrl}/auth/login`, authData, {
      withCredentials: true
    });
  }

  logout() {
    return this.http.delete(`${environment.backendUrl}/auth/logout`, {
      withCredentials: true
    });
  }
}

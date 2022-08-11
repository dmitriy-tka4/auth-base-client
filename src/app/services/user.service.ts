import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {

  }

  findAll(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${environment.backendUrl}/users`);
  }

  findCurrentUser(): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${environment.backendUrl}/profile`, {
      withCredentials: true
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'https://localhost:5001/api/';
  private currectUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currectUserSource.asObservable();

  constructor(private http: HttpClient) { };

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currectUserSource.next(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(`${this.baseUrl}account/register`, model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currectUserSource.next(user);
        }
      })
    );
  }

  setCurrectUser(user: User) {
    this.currectUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currectUserSource.next(null);
  }

}

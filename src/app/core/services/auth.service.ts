import { Constants } from 'src/app/shared/utils/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMapTo, take, switchMap, tap, mapTo, catchError } from 'rxjs/operators';
import { Credentials } from 'src/app/models/credentials';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class AuthService  {

  constructor(
    private http: HttpClient,
    private router: Router,
    private userStore: UserStore) {

    this.http.get<void>(`${environment.apiUrl}/${Constants.ROOTS_CSRF_TOKEN}`).subscribe();
  }

  register(credentials: Credentials): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/${Constants.ROOTS_REGISTER}`, credentials);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/${Constants.ROOTS_LOGIN}`, { email, password }).pipe(
      switchMapTo(this.fetchUser()),
        take(1),
        mapTo(true),
        catchError(() => {
          return of(false);
        })
      );
  }

  logout(): void {
    this.http.get<void>(`${environment.apiUrl}/${Constants.ROOTS_LOGOUT}`).subscribe(() => {
      this.userStore.removeUser();
      this.router.navigateByUrl('/' + Constants.ROOTS_LOGIN);
    });
  }

  fetchUser(forceReload = false): Observable<User> {
    return this.userStore.user$.pipe(
      take(1),
      switchMap(user => {
        return (!!user && !forceReload)
          ? of(user)
          : this.http.get<User>(`${environment.apiUrl}/${Constants.ROOTS_ME}`, {}).pipe(
            tap(u => this.userStore.setUser(u))
          );
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'https://bot-backend-jeap.onrender.com/users/exist/';
  private loggedInUser = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    const body = { username, password };

    return this.http.post<any>(this.apiUrl, body).pipe(
      map(response => {
        if (response && response.username) {  
          this.loggedInUser.next(response.username);  
          return true;
        }
        return false;
      }),
      catchError(() => {
        return [false];  // En caso de error, retorna `false`
      })
    );
  }

  logout() {
    this.loggedInUser.next(null);
  }

  isAuthenticated(): boolean {
    return this.loggedInUser.value !== null;
  }

  getUser(): string | null {
    return this.loggedInUser.value;
  }
}

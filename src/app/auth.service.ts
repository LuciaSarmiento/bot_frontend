import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: { [key: string]: string } = {  // Aquí agregamos el tipo de índice
    admin: 'admin123',
    user1: 'user123'
  };
  
  private loggedInUser = new BehaviorSubject<string | null>(null);

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (this.users[username] && this.users[username] === password) {
      this.loggedInUser.next(username);
      return true;
    }
    return false;
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

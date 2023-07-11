import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedInUser: { name: string, role: string } = { name: '', role: '' };

  setLoggedInUserDetails(name: string, role: string): void {
    this.loggedInUser.name = name;
    this.loggedInUser.role = role;
  }

  getLoggedInUserDetails(): { name: string, role: string } {
    return this.loggedInUser;
  }
}
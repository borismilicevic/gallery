import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public loginFlag: boolean;
  public currentUser: User;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("AuthenticationService.constructor: ", this.currentUser);
    this.loginFlag = this.currentUser !== null;
  }

  login(user: User): boolean {
    this.currentUser = user;
    this.loginFlag = true;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return this.loginFlag;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loginFlag = false;
  }
}

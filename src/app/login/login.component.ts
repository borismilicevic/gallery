import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    // redirect to home if user found in local storage
    if (this.authenticationService.loginFlag)
      this.router.navigate(['./gallery']);
  }

  ngOnInit() {
    this.user = new User();
  }

  loginUser() {
    if (this.authenticationService.login(this.user))
      this.router.navigate(['./gallery']);
  }

}

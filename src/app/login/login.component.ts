import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = new User();
  }

  loginUser()
  {
    this.authenticationService.login();
    console.log(this.user);
  }

}

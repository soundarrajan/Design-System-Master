import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../services/local-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false

  constructor(private router: Router,
    private loginservice: LocalService) { }

  ngOnInit() {
  }

  checkLogin() {
    if (this.loginservice.authenticate(this.username, this.password)
    ) {
      this.invalidLogin = false;
      if (this.loginservice.URLFrom.indexOf('login') == -1) {
        if (this.loginservice.hasRouteAccess(this.loginservice.URLFrom))
          this.router.navigate([this.loginservice.URLFrom])
        else
          this.router.navigate([''])
      }
      else
        this.router.navigate(['']);
    } else
      this.invalidLogin = true
  }

}
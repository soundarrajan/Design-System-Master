import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalService } from './local-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router,
    private authService: LocalService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn()){
      this.authService.URLFrom = state.url;
      return true;
    }
      
    // return true; // For skip login
    this.router.navigate([this.authService.URLFrom]);
    return false;

  }

}
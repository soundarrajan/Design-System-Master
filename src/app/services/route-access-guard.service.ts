import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { LocalService } from './local-service.service';

@Injectable({
    providedIn: 'root'
})
export class RouteAccessGaurdService implements CanActivateChild {

    constructor(private router: Router,
        private authService: LocalService) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.hasRouteAccess(state.url)) {
            this.authService.URLFrom = state.url;
            return true;
        }
        else {
            this.router.navigate([this.authService.errorurl]);
            return false;
        }
    }

}
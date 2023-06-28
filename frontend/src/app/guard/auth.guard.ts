import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authGuardService: AuthGuardService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const user = this.authService.isAuthenticated;
        if (this.authGuardService.isAuthenticated()) {
            console.log('A 1');
            const role = this.authGuardService.getRole();
            if(route.data && route.data['role'] ) {
                console.log('A 2');
                if(route.data['role'] === role) {
                    console.log('A 3');
                    return true;
                }
                console.log('A 4');
                return false;
            } 
            console.log('A 5');
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/signin']);
        return false;
    }
}
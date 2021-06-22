import { Injectable } from '@angular/core';
import { Router , CanActivate, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService , private router : Router) { }

  canActivate(): boolean | UrlTree {
    if(this.auth.loggedIn) return true;
    return this.router.createUrlTree(['home']);
  }

}

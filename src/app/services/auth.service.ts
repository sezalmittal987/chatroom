import { Injectable } from '@angular/core';
import { Router } from '@angular/router' ;
import { JwtHelperService } from '@auth0/angular-jwt' ;

import { UserService } from './user.service';
import { User }  from '../models/user.model';


@Injectable({
  providedIn: 'root',
})

export class AuthService {

  loggedIn : boolean =  false;

  currentUser : User = new  User();

  constructor(private userService  : UserService,
              private router : Router,
              public jwtHelper : JwtHelperService,   
            ) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  setCurrentUser(decodedUser :any): void {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.avatar = decodedUser.avatar;
    this.currentUser.username = decodedUser.username;
    this.currentUser.email = decodedUser.email ;
    this.currentUser.rooms = decodedUser.rooms;
    this.currentUser.joinedRooms = decodedUser.joinedRooms;
    this.currentUser.myRooms = decodedUser.myRooms;
  }

  decodeUserFromToken(token : string ){
    return this.jwtHelper.decodeToken(token).user;
  }

  login(emailAndPassword : any): void {
    this.userService.login(emailAndPassword).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        this.loggedIn = true;
        this.router.navigate(['/rooms']);
      },
      // error => this.toast.setMessage('invalid email or password!', 'danger')
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.currentUser = new User();
    this.router.navigate(['/']);
  }

  getUser() : any{
    if(this.loggedIn) return this.currentUser;
    // else this.toast.setMessage('User is not signed in !', 'danger')
  }

}

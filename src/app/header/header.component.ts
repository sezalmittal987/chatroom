import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn !: boolean ;
  currentUser !: User ;

  constructor(private authService : AuthService) {  }

  ngOnInit(): void {
    this.loggedIn = this.authService.loggedIn;
    if(this.loggedIn) this.currentUser = this.authService.getUser();
  }

}

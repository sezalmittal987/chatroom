import { Component, OnInit,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  loginForm !: FormGroup;
  user !: User;     

  constructor(private authService : AuthService , private userService : UserService , private fb:FormBuilder,private router: Router) { 
    this.createForm();
  }

  ngOnInit(): void {
  }
  createForm(){
    this.loginForm = this.fb.group({
      email :[''],
      password : ['']
    })
  }

  onSubmit(){
    this.user= this.loginForm.value;
    console.log(this.user);
    this.authService.login({email : this.user.email , password : this.user.password});
    this.router.navigate(['/rooms']);
  } 
}

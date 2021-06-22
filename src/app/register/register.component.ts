import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { UserService  } from '../services/user.service';
import { ToastComponent } from '../toast/toast.component';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm !: FormGroup;
  user !: User;
  img !: any;
  imgprev !: boolean;

  constructor(private imageService : ImageService ,
    private toast :ToastComponent ,
    private userService : UserService ,
    private fb:FormBuilder,
    private router: Router ,
    ) { 
    
  }

  ngOnInit(): void {
    this.createForm();
    this.imgprev = false;
  }

  createForm(){
    this.registerForm = this.fb.group({
      username : [''],
      email : [''],
      password : [''],
      image : [''],
    })
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.img = event.target.result
    });
    if(file)
    reader.readAsDataURL(file);
    this.imgprev=true;
  }

  onSubmit(){
    this.user = this.registerForm.value;
    console.log(this.user);
    this.imageService.uploadImage(this.img).subscribe(
      res=>{
        this.user.avatar = res._id;
        this.userService.register(this.user).subscribe(
            res => {
              this.toast.setMessage('you successfully registered!', 'success');
              this.router.navigate(['home']);
            },
            error => this.toast.setMessage('email already exists', 'danger')
          );
      },
      err=>{
        this.toast.setMessage('email already exists', 'danger')
      }
    )
    this.router.navigate(['rooms']);
  }


}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { Room } from '../models/room.model';
import { RoomService } from '../services/room.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { ToastComponent } from '../toast/toast.component';
import { AuthService } from '../services/auth.service';
import { AccountService } from '../services/account.service';
import { ImageService } from '../services/image.service';
import { Image } from '../models/image.model';
import { ObjectId } from 'mongoose';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})

export class RoomsComponent implements OnInit {

  constructor(
    private roomService : RoomService,
    private fb:FormBuilder,
    private router: Router,
    private toast : ToastComponent,
    private authService : AuthService,
    private accountService :AccountService,
    private imageService : ImageService,
  ) {}


  rooms !: Room[];
  selectedRoom !: Room;
  room !: Room;
  cform !: boolean;
  createRoomForm !: FormGroup;
  imgprev !: boolean;
  img !: any;
  user !: User;
  selectedUsers !: User[];
  selectedImage !: Buffer;
  imgfile !: File;
  adminname !: string;
  allrooms : boolean = true;

  ngOnInit(): void {
    this.imgprev = false;
    this.showRooms();
    this.cform = true;
    this.createForm();
    this.user = this.authService.getUser();
  }

  createForm(){
    this.createRoomForm = this.fb.group({
      roomname : [''],
      tagline : [''],
      description : [''],
      image : [''],
    })
  }

  showRooms(){
    this.showForm();
    this.allrooms= true;
    this.roomService.getRooms().subscribe(
      res=>{this.rooms = res ;},
      err=>{this.toast.setMessage('Server Error!', 'danger');}
    );
  }
  
  showRoom(input : Room){
    this.selectedRoom =input;
    console.log(input);
    this.accountService.getUser(input.admin).subscribe(
      res=>{
        this.adminname = res.username ;
      },
      err=>{
        this.toast.setMessage(err.message, 'danger');
      })
    this.roomService.getSelectedUsers(input).subscribe(
      res=>{
        this.selectedUsers = res ;
      },
      err=>{
        this.toast.setMessage(err.message, 'danger');
      })
      console.log(this.selectedRoom);
      console.log(this.selectedRoom.icon);
    this.imageService.getImage(this.selectedRoom.icon).subscribe(
      res=>{this.selectedImage = res.image;},
      err=>{this.toast.setMessage(err.message, 'danger');}
    );
    this.cform = false;
  }

  showForm(){
    this.cform = true;
    this.imgprev = false;
  }

  processFile(event :any) {
    this.imgfile = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.img = event.target.result;
    });
    if(this.imgfile){
      // console.log(this.imgfile);
      reader.readAsDataURL(this.imgfile);
    }
    this.imgprev=true;
  }

  onSubmit(){
    this.room= this.createRoomForm.value;
    console.log(this.room);
    this.room.admin = this.user._id;
    this.imageService.uploadImage(this.img).subscribe(
      res=>{
        this.room.icon = res._id;console.log(this.room.icon);
        this.roomService.push(this.room).subscribe(
          res2=>{
            this.toast.setMessage('Room created!', 'danger');
            // this.router.navigate(['chats']);
          },
          err2=>{
            this.toast.setMessage(err2.message, 'danger');
          }
        );
      },
      err=>{this.toast.setMessage(err.message, 'danger');}
    );
    

    this.createRoomForm.reset();
    this.imgprev=false;
  }

  getMyRooms(){
    this.allrooms=false;
    this.showForm();
    this.roomService.getMyRooms().subscribe(
      res=>{this.rooms = res ;},
      err=>{this.toast.setMessage('Server Error!', 'danger');}
    );
  }

  getJoinedRooms(){
    this.allrooms = false;
    this.showForm();
    this.roomService.getJoinedRooms().subscribe(
      res=>{this.rooms = res ;},
      err=>{this.toast.setMessage('Server Error!', 'danger');}
    );
  }

  joinRoom(input : Room){
    this.accountService.joinRooms(input).subscribe(
      res=>{ 
        this.roomService.joinRoom(input).subscribe(
          res=>{this.toast.setMessage('Room joined!' ,'primary');}
        )},
      err=>{this.toast.setMessage('Server Error!', 'danger');}
    );
    this.showForm();
  }
  chat(input : Room){
    this.router.navigate(['chats'], { queryParams: { room: this.selectedRoom._id} });
  }

}

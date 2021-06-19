import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { Room } from '../models/room.model';
import { RoomService } from '../services/room.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { USERS } from '../utils/users';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})

export class RoomsComponent implements OnInit {

  constructor(
    private roomService : RoomService,
    private fb:FormBuilder,
    private router: Router
  ) {}


  rooms !: Room[];
  selectedRoom !: Room;
  room !: Room;
  cform !: boolean;
  createRoomForm !: FormGroup;
  imgprev !: boolean;
  img !: any;
  user !: User;

  ngOnInit(): void {
    this.imgprev = false;
    this.rooms = this.roomService.getRooms();
    this.cform = true;
    this.createForm();
    this.user = USERS[0];
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
    this.rooms = this.roomService.getRooms();
  }
  
  showRoom(input : Room){
    this.selectedRoom =input;
    console.log(this.selectedRoom);
    this.cform = false;
  }

  showForm(){
    this.cform = true;
    this.imgprev = false;
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
    this.room= this.createRoomForm.value;
    this.room.icon = this.img
    console.log(this.room);
    this.roomService.push(this.room);
    this.createRoomForm.reset();
    this.imgprev=false;
    this.router.navigate(['/chats']);
  }

  getMyRooms(){
    this.rooms = this.roomService.getMyRooms();
  }
  getJoinedRooms(){
    this.rooms = this.roomService.getJoinedRooms();
  }

}

import { Component,AfterViewChecked, ElementRef, ViewChild,    OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Room } from '../models/room.model';
import { Message } from '../models/message.model' ; 
import { SocketioService}  from '../services/socketio.service';
import { ActivatedRoute } from '@angular/router';
import { ObjectId } from 'mongoose';
import { RoomService } from '../services/room.service';
import { ToastComponent } from '../toast/toast.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit{
  constructor(private socketService :  SocketioService,
              private route : ActivatedRoute,
              private roomService : RoomService,
              private toast :ToastComponent,
              private authService : AuthService,
              ) { }

  newMessage !: string;
  roomid !: any;
  currentUser !: User;
  currentRoom !: Room;
  message !: Message;
  messages !: Message[];
  cusers !: boolean;
  currentUsers !: User[];
  allUsers !: User[];
  value !: string;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((res) => {
      this.roomid = res.get('room');
    })
    this.currentUser = this.authService.getUser();
    this.roomService.getRoom(this.roomid).subscribe(
      res=>{
        this.currentRoom = res;
        this.socketService.setupSocketConnection();
        this.socketService.joinRoom(this.currentUser._id,this.currentRoom._id);
        this.socketService.getMessages.subscribe(
          res=>{this.messages = res;},
          err=>{this.toast.setMessage("Couldn't load messages!" , 'danger');}
        );
        this.cusers=true;
        this.socketService.getCurrentUsers.subscribe(
          res=>{this.currentUsers = res;},
          err=>{this.toast.setMessage("Couldn't load current users!" , 'danger');}
        );
        this.roomService.getSelectedUsers(this.currentRoom).subscribe(
          res=>{this.allUsers = res;},
          err=>{this.toast.setMessage("Couldn't load users!" , 'danger');}
        );
        this.socketService.getMessages.subscribe(
          res=>{this.messages=res;},
          err=>{this.toast.setMessage("Loading Messages.." , 'danger');}
        )
      },
      err=>{
        this.toast.setMessage(err.message , 'danger')
      }
    );
    
    
    this.value = "Type your message";
  }

  sendMessage(){
    this.message = { user : this.currentUser._id , room : this.currentRoom._id ,timestamp : "01:03 AM" , text : this.newMessage }
    this.socketService.sendMessage(this.message);
    this.newMessage="";
  }

  toggleUsers(){
    this.cusers = !(this.cusers);
  }

}

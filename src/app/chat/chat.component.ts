import { Component,AfterViewChecked, ElementRef, ViewChild,    OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Room } from '../models/room.model';
import { Message } from '../models/message.model' ; 
import { SocketioService}  from '../services/socketio.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit{

  constructor(private socketService :  SocketioService) { }

  newMessage !: string;
  currentUser !: User;
  currentRoom !: Room;
  message !: Message;
  messages !: Message[];
  cusers !: boolean;
  currentUsers !: User[];
  allUsers !: User[];
  value !: string;

  ngOnInit(): void {
    // this.socketService.setupSocketConnection();
    // this.socketService.joinRoom(this.currentUser,this.currentRoom);
    // this.messages = this.socketService.getMessages(this.currentRoom);
    // this.cusers=true;
    // this.currentUsers = this.socketService.getCurrentUsers(this.currentRoom);
    // this.allUsers =  this.socketService.getAllUsers(this.currentRoom);
    // this.value = "Type your message";
  }

  sendMessage(){
    // this.message = { user : this.currentUser , room : this.currentRoom ,timestamp : "01:03 AM" , text : this.newMessage }
    // this.socketService.sendMessage(this.message);
    // this.newMessage="";
  }

  toggleUsers(){
    this.cusers = !(this.cusers);
  }

}

import { Injectable } from '@angular/core';
import * as io from  "socket.io-client";
import { environment } from '../../environments/environment';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { Room } from '../models/room.model';
import { MESSAGES } from '../utils/messages';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket!: any;

  constructor() { }
  
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  joinRoom(user : User , room : Room){
    this.socket.on("connect",()=>{
      console.log(`${this.socket.id} connected!`);
      this.socket.emit("join-room",{user,room});
    });
  }

  sendMessage(data : Message){
    console.log(data.text);
    this.socket.emit("new-message", data);
    // console.log("messsef");
    
    // data.room.messages.push(data);
  }
    
  getMessages(room : Room):Message[]{
    this.socket.on("new-message",(data:Message)=>{
      // console.log(data.text);
      // room.messages.push(data);
    });
    return room.messages;
  }

  getAllUsers(room :Room) : User[]{
    return room.users;
  }
    
  getCurrentUsers(room : Room) : User[]{
    this.socket.on("join-room",(data :any)=>{
      
    });
    return room.currentUsers;
  }
}


import { Injectable , OnInit } from '@angular/core';
import * as io from  "socket.io-client";
import { environment } from '../../environments/environment';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { Room } from '../models/room.model';
import { ObjectId } from 'mongoose';
import { RoomService } from './room.service';
import { ToastComponent } from '../toast/toast.component';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService implements OnInit{

  socket!: any;

  constructor(private roomService :RoomService,
              private toast : ToastComponent,
              ) { }
  
  ngOnInit(){  }
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  joinRoom(user : ObjectId, room : ObjectId){
    this.socket.on("connect",()=>{  
      console.log(`${this.socket.id} connected!`);
      this.socket.emit("join-room",{user,room});
    });
  }

  sendMessage(data : Message){
    this.socket.emit("new-message", data);
  }


  getMessages = new Observable<Message[]>((observer)=> {
    let messages !: Message[];
    this.socket.on('new-message', (data :Message[])=>{
      observer.next(data);
      // this.roomService.getMessages(roomid).subscribe( 
      //   res=>{observer.next(res);},
      //   err=>{this.toast.setMessage(err.message , 'danger');}                                                                                                                                                                                                                                                                                                                    
      // )
    })
  }) 

  getCurrentUsers = new Observable<User[]>((observer)=> {
    let users !: User[];
    this.socket.on('join-room' , (data :User[])=>{
      observer.next(data);                                                                                                                                                                                                                                                                                                                    
      // this.roomService.getCurrentUsers(roomid).subscribe(
      //   res=>{users = res;observer.next(res);},
      //   err=>{this.toast.setMessage(err.message , 'danger');}
      // )
    })
  })
}


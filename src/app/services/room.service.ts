import { Injectable , AfterViewChecked} from '@angular/core' ;
import { Room } from '../models/room.model' ;
import { Observable } from 'rxjs';
import { User } from '../models/user.model' ;
import { HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';
import { ObjectId } from 'mongoose';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})

export class RoomService implements AfterViewChecked{

  user !: User;

  constructor(private authService : AuthService ,private http :  HttpClient) {  
    this.user =  this.authService.getUser();
  }

  ngAfterViewChecked() {
      this.user = this.authService.getUser();
  }
  getRooms() : Observable<Room[]>{
    this.user =  this.authService.getUser();
    return this.http.get<Room[]>(`/api/room/getall/${this.user.username}`);
  }

  getRoom(input : any) :Observable<Room>{
    return this.http.get<Room>(`/api/room/get/${input}`);
  }

  getJoinedRooms() : Observable<Room[]>{
    this.user =  this.authService.getUser();
    return this.http.get<Room[]>(`/api/room/joined/${this.user.username}`);
  }

  getMyRooms(): Observable<Room[]>{
    this.user =  this.authService.getUser();
    return this.http.get<Room[]>(`/api/myrooms/${this.user.username}`);
  }

  push(input : Room): Observable<Room>{
    this.user =  this.authService.getUser();
    return this.http.post<Room>(`/api/room/insert/${this.user._id}` , input);
  }

  joinRoom(input : Room) : Observable<Room>{
    this.user =  this.authService.getUser();
    return this.http.post<Room>(`/api/room/join/${this.user._id}` , input);
  }

  getSelectedUsers(input :Room) : Observable<User[]>{
    return this.http.get<User[]>(`/api/room/users/${input._id}`);
  }

  getCurrentUsers(input : ObjectId) :Observable<User[]>{
    return this.http.get<User[]>(`/api/room/current/${input}`);
  }

  getMessages(input : ObjectId) : Observable<Message[]>{
    return this.http.get<Message[]>(`/api/room/message/${input}`);
  }
}

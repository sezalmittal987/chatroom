import { Injectable } from '@angular/core' ;
import { Room } from '../models/room.model' ;
import { User } from '../models/user.model' ;
import { ROOMS } from '../utils/rooms' ; 
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  user !: User;

  constructor(private authService : AuthService) {  
    this.user =  this.authService.getUser();
  }

  getRooms() : Room[]{
    return ROOMS;
  }

  getJoinedRooms() {
    return this.user.joinedRooms;
  }

  getMyRooms(){
    return this.user.myRooms;
  }

  push(input : Room){
    ROOMS.push(input);
  }

  notJoined(){
    
  }

}

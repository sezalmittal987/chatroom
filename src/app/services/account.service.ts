import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Room } from '../models/room.model';
import { AuthService } from '../services/auth.service'; 
import { ObjectId } from 'mongoose';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  user !: User;
  constructor(private http: HttpClient,
      private authService : AuthService,
      ) { 
    this.user = this.authService.getUser();
  }

  joinRooms(input : Room) : Observable<User>{
    this.user = this.authService.getUser();
    return this.http.post<User>(`/api/joinroom/${this.user._id}/${input._id}` , input);
  }

  getUser (input :ObjectId) :Observable<User>{
    return this.http.get<User>(`/api/user/get/${input}`);
  }
}

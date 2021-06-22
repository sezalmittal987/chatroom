import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {  

  user !: User;
  constructor(private http: HttpClient,
              ) {}

  

  register(user: User): Observable<User> {
    console.log(user);
    return this.http.post<User>('/api/register', user);
  }

  login(credentials:any): Observable<any> {
    return this.http.post('/api/login', credentials);
  }

}

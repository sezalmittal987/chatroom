import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {  

  constructor(private http: HttpClient) { }

  

  register(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log(user);
    return this.http.post<User>('/api/register', user  );
  }

  login(credentials : any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      body : credentials,
    };
    console.log(httpOptions.body);
    return this.http.get<User> ( '/api/login',httpOptions);
  }

}

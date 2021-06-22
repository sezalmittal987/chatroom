import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model' ;
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { ObjectId } from 'mongoose';
import { Image } from '../models/image.model';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http : HttpClient) { }

  uploadImage(input : Buffer): Observable<Image>{
    // console.log(input);
    return this.http.post<Image>(`/api/images`,input);
  }

  getImage(input : ObjectId) : Observable<Image>{
    return this.http.get<Image>(`api/getimage/${input}`);
  }
}

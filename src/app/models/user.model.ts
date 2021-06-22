import { Room } from './room.model';
import { ObjectId } from 'mongoose';

export class User{
    _id !: ObjectId;
    avatar !: ObjectId;
    username !: string ;
    email !: string ;
    password !: string ;
    joinedRooms !: ObjectId[];
    myRooms !: ObjectId[];
}
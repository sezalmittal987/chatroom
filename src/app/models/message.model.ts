import { Room } from "./room.model";
import { User } from "./user.model";
import { ObjectId } from 'mongoose';

export class Message { 
    user !: ObjectId;
    room !: ObjectId;
    timestamp !: string;
    text !: string ;
}
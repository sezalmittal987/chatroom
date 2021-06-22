import { User } from './user.model';
import { Message } from './message.model';
import { ObjectId } from 'mongoose';

export class Room{
    _id !: ObjectId;
    icon !: ObjectId;
    roomname !: string ;
    tagline !: string ;
    description !: string ;
    users !: ObjectId[] ;
    admin !: ObjectId ;  
    messages !: Message[] ;   
    currentUsers !: ObjectId[] ;
}
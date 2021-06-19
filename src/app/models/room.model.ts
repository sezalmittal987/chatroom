import { User } from './user.model';
import { Message } from './message.model';

export class Room{
    _id !: string;
    icon !: any;
    roomname !: string ;
    tagline !: string ;
    description !: string ;
    users !: User[] ;
    admin !: User ;  
    messages !: Message[] ;   
    currentUsers !: User[] ;
}
import { Room } from "./room.model";
import { User } from "./user.model";

export class Message { 
    user !: User;
    room !: Room;
    timestamp !: string;
    text !: string ;
}
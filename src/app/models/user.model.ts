import { Room } from './room.model';

export class User{
    _id !: string;
    avatar !: any ;
    username !: string ;
    email !: string ;
    password !: string ;
    rooms !:  Room[];
    joinedRooms !: Room[];
    myRooms !: Room[];
}
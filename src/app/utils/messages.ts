import { Message } from '../models/message.model';
import { USERS } from './users';
import { ROOMS } from './rooms' ;

export const MESSAGES : Message[]=[{
        user : USERS[0],
        room : ROOMS[1],
        timestamp : "09:40 AM",
        text : "Cuckoo cuckoo… Thaatha thaatha kala vetti Cuckoo cuckoo… Pondhula yaaru meen koththi Cuckoo cuckoo… Thanniyil odum thavalaikki Cuckoo cuckoo… Kambali poochi thangachi",
    },
    {
        user : USERS[0],
        room : ROOMS[1],
        timestamp : "09:40 AM",
        text : "Cuckoo cuckoo… Thaatha thaatha kala vetti Cucko",
    },
    {
        user : USERS[0],
        room : ROOMS[1],
        timestamp : "09:40 AM",
        text : "Cuckoo cuckoo… Thaatha thaatha kala vetti Cucko",
    }
]
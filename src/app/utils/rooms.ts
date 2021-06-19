import { Room } from '../models/room.model';
import { USERS } from './users';
export const ROOMS: Room[]=[
    {
        _id : "9u302735",
        icon: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        roomname: "shrey",
        tagline : "weegersehbehbe",
        description : "je banda bunda marna hai tan dass",
        users : [],
        admin : USERS[0] , 
        messages : [],
        currentUsers :[],
    },
    {
        _id : "9u302735",
        icon: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        roomname: "sezal",
        tagline : "weegersehbehbe",
        description : "bol na aunty aaun kya ghanit main bajaun kya sout main lagaun kya bolna aunty aaun kya twelve twelve clock ko aunty ki ghanti bajakena aunty aaun kya twelve twelve clock ko aunty ki ghanti bajakena aunty aaun kya twelve twelve clock ko aunty ki ghanti bajakena aunty aaun kya twelve twelve clock ko aunty ki ghanti bajake na aunty aaun kya twelve twelve clock ko aunty ki ghanti bajake",
        users :[],
        admin :  USERS[1] ,
        messages : [],
        currentUsers : [],
    }
];
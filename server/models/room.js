const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema ({
    icon : Buffer,
    roomname : String,
    tagline : String,
    description : String,
    users : [{
            user:{
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                }
            }
        }],
    admin :{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    messages : [{
                message:{
                    user:{
                        id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "User",
                        }
                    },
                    room:{
                        id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Room",
                        }
                    } ,
                    timestamp : String,
                    text : String, 
                }
            }],
    currentUsers : [{
        user:{
            // socket : ,
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        }
    }],

});
const Room= mongoose.model('Room' , roomSchema);
module.exports = Room;
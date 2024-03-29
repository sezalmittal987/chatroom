const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema ({
    icon : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
    },
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
                    id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                    }
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
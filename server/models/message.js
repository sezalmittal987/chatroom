const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
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
})

const Message= mongoose.model('Message' , messageSchema);
module.exports = Message;
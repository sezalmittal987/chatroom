const express = require("express");
const router = express.Router();
require("../controllers/chatCtrl");

module.exports = (io)=>{
    io.on('connection' , socket=>{
        console.log(`${socket.id} connected!`);
        var user;
        socket.on('join-room' , (data) => {
            // console.log(data.user);
            //use function to push user into currentusers of the room
            try{
                const docs = Room.findOne({_id : data.roomid}).currentUsers.push(data.userid).save();
                const roomname = Room.findOne({_id : data.roomid} , 'roomname');
                io.to(roomname).emit('join-room' , docs);
            } catch (err) {
                //print toast message.
            }
        })
        
        socket.on('new-message', (data) => {
            try{
                const docs = Room.find({roomname : req.body.roomid}).messages.push(req.body.message).save();
                const roomname = Room.findOne({_id : data.roomid} , 'roomname');
                io.to(roomname).emit('join-room' , docs);
            } catch (err) {
                //print toast message.
            }
            io.emit('new-message' , data );
        })

        socket.on('disconnect',(socket)=>{
            //delete from user in the database
            try{
                const docs =  Room.find({roomname : req.body.roomid}).messages.push(req.body.message).save();
                const roomname =  Room.findOne({_id : data.roomid} , 'roomname');
                io.to(roomname).emit('join-room' , docs);
            } catch (err) {
                //print toast message.
            }

        })

    })
}
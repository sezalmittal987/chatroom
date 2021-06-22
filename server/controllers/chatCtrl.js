const User = require('../models/user');
const Room = require('../models/room');
const Message = require('../models/message');

module.exports = (io)=>{
    let currentRoomId = null;
    let currentUserId = null;
    let currentUser = null;
    io.on('connection' , socket=>{
        console.log(`${socket.id} connected!`);
        socket.on('join-room' , async(data) => {
            socket.join(data.room);
            currentRoomId = data.room;
            currentUserId = data.user;
            currentUser = await User.findOne({_id : data.user} ,'_id');
            const docs = await Room.findOneAndUpdate({_id : data.room} , {$push : {currentUsers : currentUser}}).populate('currentUsers').exec();
            // socket.broadcast.to(data.room).emit('message' , {...}); //broadcast message  
            io.to(data.room).emit('join-room' , docs._id);
            io.to(data.room).emit('new-message' , docs._id);
        })
        
        socket.on("new-message", (data) => {
            try{
                new Message(data).save((err , message)=>{
                    if(message){
                        Room.findOneAndUpdate({_id : data.room} , {$push : {messages : message }}).populate('messages').exec((err,docs)=>{
                            io.to(data.room).emit('new-message' , docs._id);
                        });
                        
                    }
                })
            } catch (err) {
                //print toast message.
            }
            io.emit('new-message' , data );
        })

        socket.on('disconnect',()=>{
            console.log(socket.id);
            try{
                console.log(currentUser , currentRoomId);
            
            const docs = Room.findOneAndUpdate({_id : currentRoomId},{$pull :{ currentUsers : {_id : currentUserId}}}).populate('currentUsers').exec(()=>{
                console.log("removed!");
                io.to(currentRoomId).emit('join-room' , currentRoomId);
            });
            } catch (err) {
                //print toast message.
            }

        })

    })
}
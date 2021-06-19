const Room =  require('../models/room');
const User = require('../models/user');

exports.userIntoRoom = async(req, res) => {
    try{
        const docs = await Room.find({roomname : req.body.roomid}).currentUsers.push(req.body.userid).save();
        res.status(201).json(docs);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}



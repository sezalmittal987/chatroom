const Room =  require('../models/room');
const User = require('../models/user');

exports.getAllRooms = async (req, res) => {
    try {
        const arr = await User.find({username : req.params._id} ,'joinedRooms').populate('joinedRooms').exec();
        const arr2 = await User.find({username : req.params._id} , 'myRooms').populate('myRooms').exec();
        const res = await arr.concat(arr2);
        const docs = await Room.find({rooms : {$nin : res }}).populate('rooms').exec();
        res.status(200).json(docs);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

exports.getJoinedRooms = async(req,res)=>{
    try{
        const joined = await User.find({username : req.params._id} ,'joinedRooms').populate('joinedRooms').exec();
        res.status(200).json(joined);
        // return joined;
    }catch(err){
        return res.status(400).json({ error: err.message });
    }
}

exports.getMyRooms = async(req,res)=>{
    try{
        const myRooms = await User.find({username : req.params._id} , 'myRooms').populate('myRooms').exec();
        res.status(200).json(myRooms);
    }catch(err){
        return res.status(400).json({error : err.message});
    }
}

exports.getRoom = async(req,res)=>{
    try{
        const obj = await Room.findOne({ _id: req.params.id });
        res.status(200).json(obj);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

exports.insert = async (req, res) => {
    try {
        const obj = await new Room(req.body).save();
        res.status(201).json(obj);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

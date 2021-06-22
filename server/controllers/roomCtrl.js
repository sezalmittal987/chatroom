const Room =  require('../models/room');
const User = require('../models/user');
const express = require("express") ;
const mongoose = require('mongoose');
const router = new express.Router();

router.get('/room/getall/:username',async (req, res) => {
        try {
        const arr1 = await User.findOne({username : req.params.username} ,'joinedRooms').populate('joinedRooms').exec();
        const arr2 = await User.findOne({username : req.params.username} , 'myRooms').populate('myRooms').exec();
        const arr = arr2.myRooms.concat(arr1.joinedRooms);
        const docs = await Room.find({_id : {$nin : arr }});
        res.status(200).json(docs);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
})

router.get('/room/joined/:username' , async(req,res)=>{
    try{
        const obj = await User.findOne({username : req.params.username} ,'joinedRooms').populate('joinedRooms').exec();
        const arr = [];
        for(let i = 0 ; i< obj.joinedRooms.length ;i++) {
            const doc = await Room.findOne({_id: obj.joinedRooms[i]._id});
            arr.push(doc);
        }
        res.status(200).json(arr);
    }catch(err){
        return res.status(400).json({ error: err.message });
    }
})

router.get('/myrooms/:username', async(req,res)=>{
    try{
        const obj = await User.findOne({username : req.params.username} , 'myRooms').populate('myRooms').exec();
        const arr = [];
        for(let i = 0 ; i< obj.myRooms.length ;i++) {
            const doc = await Room.findOne({_id: obj.myRooms[i]._id});
            arr.push(doc);
        }
        res.status(200).json(arr);
    }catch(err){
        return res.status(400).json({error : err.message});
    }
})

router.get( '/room/get/:roomname' ,async(req,res)=>{
    try{
        const obj = await Room.findOne({ roomname: req.params.roomname});
        res.status(200).json(obj);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

router.post('/room/insert/:id' ,  async (req, res) => {
    try {   
        await new Room(req.body).save((err , room)=>{
            if(err){ return res.status(400).json({ error: err.message }); }
            if(room){
                try{
                    const docs = User.findOneAndUpdate({_id : req.params.id},{$push : {myRooms : room} }).populate('myRooms').exec();
                    res.status(200).json(docs);
                }catch(err) {
                    return res.status(500).json({ error: err.message });
                }
            }
        })
    }catch(err) {
        return res.status(500).json({ error: err.message });
    }
});

router.post('/room/join/:userid' , async(req,res)=>{
    try{
        const user = await User.findOne({_id : req.params.userid});
        const docs = await Room.findOneAndUpdate({_id : req.body._id},{$push : {users : user} }).populate('users').exec();
        res.status(200).json(docs);
    }catch(err) {
        return res.status(400).json({ error: err.message });
    }
})

router.get('/room/users/:id' ,async(req,res)=>{
    try{
        const obj = await Room.findOne({_id : req.params.id} , 'users').populate('users').exec();
        const arr = [];
        for( let i = 0 ; i<obj.users.length ;i++ ){
            const doc = await User.findOne({_id : obj.users[i]._id} );
            arr.push(doc);
        }
        res.status(200).json(arr);
    }catch(err) {
        return res.status(400).json({ error: err.message });
    }
})


router.get('/room/admin/:id' ,async(req,res)=>{
    try{
        const obj = await Room.findOne({_id : req.params.id} , 'admin').populate('admin').exec();
        const doc  = await User.findOne({_id : obj.admin._id});
        res.status(200).json(arr);
    }catch(err){
        return res.status(400).json({ error: err.message });
    }
})
module.exports = router;
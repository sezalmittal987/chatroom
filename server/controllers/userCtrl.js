const jwt = require('jsonwebtoken');
const User =  require('../models/user');
const Room = require('../models/room');
const Image = require('../models/image');
const express = require("express") ;
const multer = require('multer');
const router = new express.Router();
const upload = multer({
                storage : multer.memoryStorage(),
                limits : {
                    fileSize: 10 * 1024 * 1024,
                }
              });

router.post( '/login', async(req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) { return res.sendStatus(403); }
        user.comparePassword(req.body.password, (error, isMatch) => {
            if (!isMatch) { return res.sendStatus(403); }
            const token = jwt.sign({ user }, process.env.SECRET_TOKEN);
            res.status(200).json({ token });
        });
    });
});

router.post('/register', async (req, res) => {
    try {
      const obj = await new User(req.body).save();
      console.log(obj);
      res.status(201).json(obj);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
});

router.post('/joinroom/:userid/:roomid' , async(req,res)=>{
  try{
    const room = await Room.findOne({_id : req.params.roomid});
    const docs = await User.findOneAndUpdate({_id : req.params.userid},{$push : {joinedRooms : room} }).populate('joinedRooms').exec();
    res.status(200).json(docs);
  }catch(err) {
    return res.status(400).json({ error: err.message });
  }
});

router.get('/user/get/:id' ,async(req,res)=>{
  try{
    const user = await User.findOne({_id :req.params.id});
    res.status(200).json(user);
  }catch(err) {
    return res.status(400).json({ error: err.message });
  }
})

router.post('/images', async(req,res)=>{
  // console.log('a');console.log(req.body);console.log(req.rawBody);
  try {
    const obj = await new Image({image : req.rawBody}).save();
    res.status(200).json(obj);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
})

router.post('/getimage/:id' ,async(req,res)=>{
  console.log('yes');
  try{
    const obj = await Image.findOne({_id : req.params.id}).save();
    res.status(200).json(obj);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
})
module.exports = router;
const jwt = require('jsonwebtoken');
const User =  require('../models/user');

const express = require("express") ;

const router = new express.Router();

router.get( '/login', async(req, res) => {
  console.log(req);
    // User.findOne({ email: req.body.user.email }, (err, user) => {
    //     if (!user) { return res.sendStatus(403); }
    //     user.comparePassword(req.body.user.password, (error, isMatch) => {
    //         if (!isMatch) { return res.sendStatus(403); }
    //         const token = jwt.sign({ user }, process.env.SECRET_TOKEN);
    //         res.status(200).json({ token });
    //     });
    // });
});

router.post('/register', async (req, res) => {
    try {
      console.log(req);
      const obj = await new User(req.body).save();
      console.log(obj)
      res.status(201).json(obj);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
});
// app.use('/api', router);

module.exports = router;
const express = require("express");
const app = express();
const server = require('http').Server(app); 
const io = require('socket.io')(server);
const path =require('path');
const dotenv = require('dotenv');
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const User = require('../models/user');
const chatRouter = require('../controllers/chatCtrl'); 
const userRouter= require('../controllers/userCtrl');
const roomRouter = require('../controllers/roomCtrl');

app.set( 'port',process.env.PORT||2000);
dotenv.config({path : '../../.env'});
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

//routes
chatRouter(io);
app.use('/api',userRouter);
app.use('/api' ,roomRouter);

// for accepting buffer request body
app.use(function(req, res, next) {
  req.rawBody = '';
  req.setEncoding('utf8');

  req.on('data', function(chunk) { 
    req.rawBody += chunk;
  });
  req.on('end', function() {
    next();
  });
});

const uri = process.env.MONGO_URI;

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database Connected!');
});



app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

server.listen(app.get('port'),()=>{
    console.log('server is up')
})

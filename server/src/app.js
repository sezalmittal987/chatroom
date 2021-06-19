const express = require("express");
const app = express();
const server = require('http').Server(app); 
// const bodyParser = require('body-parser');
const io = require('socket.io')(server);
const path =require('path');
const dotenv = require('dotenv');
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const User = require('../models/user');
const chatRouter = require('../routes/chat'); 
// const userRouter = require('../routes/user');
const userRouter= require('../controllers/userCtrl');

app.set( 'port',process.env.PORT||2000);
dotenv.config();
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))


const uri = "mongodb+srv://Sezal:sezalmittal@cluster0.usfbe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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

chatRouter(io);
// userRouter();
// const router = express.Router(); 
app.use(userRouter);
app.use('/api',userRouter);
// router.route('/login').post(userCtrl.login);
// router.route('/register').post(userCtrl.insert);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

server.listen(app.get('port'),()=>{
    console.log('server is up')
})

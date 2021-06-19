const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema ({
    avatar : Buffer,
    username : String,
    email : String,
    password : String,
    rooms : [{
        room:{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Room",
            }
        }
    }],
    joinedRooms : [{
        room:{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Room",
            }
        }
    }],
    myRooms : [{
        room:{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Room",
            }
        }
    }],
});

userSchema.pre('save', function(next){
    const user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) { return next(error); }
        user.password = hash;
        next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { return callback(err); }
        callback(null, isMatch);
    });
};
  

const User = mongoose.model('User' , userSchema);

module.exports = User;
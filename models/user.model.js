const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
    },
    bio:{
        type:String
    }
});

module.exports = mongoose.model("user",userSchema);
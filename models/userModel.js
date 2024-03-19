const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"please enter the name"]
    },
    email:{
        type:String,
        required:[true,"please enter the email address"],
        unique:[true,"Email is already in the database"]
    },
    password:{
        type:String,
        required:[true,"please enter the password"]
    }
})

module.exports=mongoose.model('User',userSchema)
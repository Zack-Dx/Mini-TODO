const mongoose = require("mongoose")
const {Schema} = mongoose
const UserSchema = new Schema({
    Name :{
        type : String, 
        required : true,
        unique : true
    },
    Email :{
        type : String, 
        required : true,
        unique : true
    },
    Password :{
        type : String, 
        required : true,
        unique : true
    },
    PhoneNumber : {
        type : String, 
        required : true,
        unique : true
    }
} , {timestamps : true})

const User = mongoose.model("User",UserSchema)
module.exports = User